import React, { PropsWithChildren, ReactNode, useRef } from 'react';

import { Box, Typography } from '@mui/material';
import { unflatten } from 'flat';
import type { OptionsObject } from 'notistack';
import { ParseResult, parse } from 'papaparse';
import { CSVLink } from 'react-csv';
import type { IFileWithMeta } from 'react-dropzone-uploader';
import type { ZodObject } from 'zod';

import Dropzone from './Dropzone';
import type { DropzoneProps } from './Dropzone';

import { Attachment, Section } from '~/components';
import type { UseMutationParams } from '~/hooks';
import { usePostManyMutation, useShowError } from '~/hooks';

type NestedStringify<T> = {
  [P in keyof T]: T[P] extends object ? NestedStringify<T[P]> : string;
};

type OptionalDropzoneProps =
  | 'maxFiles'
  | 'minSizeBytes'
  | 'maxSizeBytes'
  | 'accept'
  | 'multiple';

export interface CsvDropzoneProps<T>
  extends Omit<DropzoneProps, OptionalDropzoneProps>,
    Partial<Pick<DropzoneProps, OptionalDropzoneProps>> {
  /**
   * Extra content for the dropzone (e.g. instructions).
   */
  children?: ReactNode;
  /**
   * Title of the dropzone.
   */
  title?: string;
  /**
   * Name of the sample file.
   */
  sampleFileName?: string;
  /**
   * Headers of the CSV file.
   */
  csvHeaders: string[];
  /**
   * CSV headers used internally.
   * This is used if the CSV headers are different from the actual object keys.
   * For example, if the CSV headers are "First Name" and "Last Name", but the object keys are "firstName" and "lastName" (or its ID counterpart).
   */
  internalCsvHeaders?: string[];
  /**
   * Example data to be shown in the sample CSV file.
   */
  sampleData?: string[][];
  /**
   * query key of the mutation.
   */
  queryKey: any;
  /**
   * Zod validation schema to validate each row.
   */
  validationSchema: ZodObject<any>;
  /**
   * Unflatten the converted object.
   */
  unflattenObject?: boolean;
  /**
   * Assign values to non-string fields.
   */
  nonStringAssignments?: {
    [K in keyof Partial<T>]: (value: string) => T[K];
  };
  /**
   * Assign values to non-string fields, but allows for fetching data from the server.
   * This is useful for fields that are not in the schema, but are fetched from the server.
   */
  dynamicAssignments?: (
    content: NestedStringify<T>[]
  ) => Promise<Partial<T>[]> | Partial<T>[];
  /**
   * Specify fields that should be unique.
   */
  uniqueColumns?: (keyof T)[];
  /**
   * Limit the number of rows that can be uploaded.
   */
  rowLimit?: number;
  /**
   * If the validationSchema is not enough, use this function to validate each row.
   * Throw an error if the row is invalid.
   */
  rowValidationFn?: (row: T) => void;
  /**
   * Same as rowValidationFn, but for the whole content.
   * This is useful if you need to fetch data from the server and use it in the validation.
   */
  contentValidationFn?: (content: T[]) => Promise<void> | void;
  /**
   * React Query mutation function for the POST request.
   */
  mutationFn: (data: T[]) => Promise<(T & { _id: string })[]>;
  /**
   * Additional params to pass to the mutation hook.
   */
  useMutationParams?: Partial<UseMutationParams<T[], T[]>>;
  /**
   * Disable the useShowError hook.
   */
  disableShowError?: boolean;
  /**
   * Custom error message to show when the upload fails.
   */
  customError?: ReturnType<typeof useShowError>;
  /**
   * Additional params to pass to the useShowError hook.
   * This is only used if disableShowError is false.
   */
  useShowErrorParams?: OptionsObject;
}

const checkForDuplicateEntries = <T,>(fields: (keyof T)[], dataArr: T[]) => {
  fields.map((field) => {
    const values = dataArr.map((d) => d[field]);
    const uniqueValues = [...new Set(values)];
    if (values.length !== uniqueValues.length) {
      throw new Error(`Duplicate values found in "${String(field)}" column`);
    }
  });
};

const validateHeaders = (
  referenceArray: string[] | readonly string[],
  arrayToValidate: any[]
) => {
  if (referenceArray.length !== arrayToValidate.length) return false;

  let status = true;

  referenceArray.forEach((item, index) => {
    if (item !== arrayToValidate[index]) {
      status = false;
    }
  });

  return status;
};

const CsvDropzoneWithContext = <T extends object>({
  children,
  title,
  sampleFileName,
  csvHeaders,
  internalCsvHeaders,
  sampleData = [],
  queryKey,
  validationSchema,
  unflattenObject = false,
  nonStringAssignments,
  dynamicAssignments,
  uniqueColumns = [],
  rowLimit,
  rowValidationFn,
  contentValidationFn,
  mutationFn,
  useMutationParams,
  disableShowError,
  customError,
  useShowErrorParams,
  ...rest
}: PropsWithChildren<CsvDropzoneProps<T>>) => {
  title ??= 'Import File';
  sampleFileName ??= 'Sample File Name'!;

  const { mutateAsync } = usePostManyMutation({
    queryKey,
    mutationFn,
    onSuccessText: 'Entries Imported',
    disableErrorSnackbar: true,
    ...useMutationParams,
  });

  const csvLink = useRef<any>(null);

  const showError = useShowError(useShowErrorParams);

  const handleSubmit = (files: IFileWithMeta[], allFiles: IFileWithMeta[]) => {
    allFiles.forEach((f) => f.remove());

    parse(files[0].file, {
      complete: async (results: ParseResult<string[]>) => {
        try {
          // validate if headers are the same with csvHeaders
          const parsedHeaders = results.data.shift() || [];

          if (!validateHeaders(csvHeaders as string[], parsedHeaders)) {
            throw new Error('Invalid Headers');
          }

          // remove excess rows at the end of csvData
          const csvData = results.data.filter((row, idx) => {
            const lastRowNumber = results.data.length - 1;
            const isLastRow = idx === lastRowNumber;
            const isEmptyRow = row.every((r) => !r);

            // check if empty rows are present at the middle of the csvData
            if (
              !isLastRow &&
              isEmptyRow &&
              results.data[idx + 1].length !== 0
            ) {
              throw new Error(`Empty row at line ${idx + 2}`);
            }

            return !isEmptyRow;
          });

          if (csvData.length === 0) {
            throw new Error('No Data');
          }

          if (rowLimit && csvData.length > rowLimit) {
            throw new Error(
              `Row limit exceeded. Total rows: ${csvData.length}`
            );
          }

          // use internal CSV headers if they are provided
          // DEV: guarantee that the both arrays have the same length
          if (internalCsvHeaders) {
            csvHeaders = internalCsvHeaders;
          }

          let content = csvData.map((row) => {
            const getColValue = (column: string) =>
              row[csvHeaders.indexOf(column)] || '';

            // set initial values
            const rowObj: any = {};

            // transform csv row to object, fields are strings for now
            // some fields may be entered as other values instead of objectId
            // also, trim whitespace from the beginning and end of the string
            csvHeaders.forEach((header, headerIdx) => {
              rowObj[header] = (row[headerIdx] || '').trim();
            });

            // special cases: basic fields with no fetching
            if (nonStringAssignments) {
              Object.keys(nonStringAssignments).forEach((key) => {
                // @ts-ignore
                rowObj[key] = nonStringAssignments[key](getColValue(key));
              });
            }

            if (unflattenObject) {
              return unflatten(rowObj) as T;
            }

            return rowObj as T;
          });

          // special cases: dynamic fields, with fetching
          if (dynamicAssignments) {
            const assignedData = await dynamicAssignments(
              content as unknown as NestedStringify<T>[]
            );

            // DEV: guarantee that the assigned data is of the same length as the content
            // if (isDev && assignedData.length !== content.length) {
            //   throw new Error(
            //     'Dynamic assignments returned different number of rows'
            //   );
            // }

            content = content.map((row, idx) => ({
              ...row,
              ...assignedData[idx],
            }));
          }

          content.forEach((row, idx) => {
            try {
              // validation with validationSchema
              const parseResult = validationSchema.safeParse(row);
              if (!parseResult.success) {
                const issuePath = parseResult.error.issues[0].path.join('.');
                const issueMessage = parseResult.error.issues[0].message;
                throw new Error(`${issuePath} - ${issueMessage}`);
              }

              // custom validation: fields
              rowValidationFn?.(row);
            } catch (err: any) {
              throw new Error(
                `Row Number ${idx}: ${err?.message || 'Invalid Values'}`
              );
            }
          });

          // check for duplicate entries
          checkForDuplicateEntries(uniqueColumns, content);

          // custom validation: content
          await contentValidationFn?.(content);

          await mutateAsync(content);
        } catch (err) {
          if (!disableShowError) showError(customError || err);
        }
      },
    });
  };

  return (
    <Section>
      {title && (
        <Typography variant='h3' component='h2' gutterBottom>
          {title}
        </Typography>
      )}
      <Typography sx={{ mb: 1 }}>
        Please follow the format of the sample CSV file provided below before
        uploading.
      </Typography>
      <Box sx={{ mb: 1 }}>{children}</Box>
      <Attachment
        primaryText={sampleFileName}
        secondaryText='CSV'
        extension='csv'
        style={{ marginBottom: '1rem' }}
        size='large'
        variant='outlined'
        color='primary'
        onClick={() => csvLink?.current?.link?.click?.()}
      />
      <CSVLink
        data={[[...csvHeaders, ...sampleData]]}
        download={`${sampleFileName}.csv`}
        style={{ display: 'none' }}
        ref={csvLink}
      />
      <Dropzone
        onSubmit={handleSubmit}
        maxFiles={1}
        minSizeBytes={0}
        maxSizeBytes={26214400}
        accept='.csv'
        multiple={false}
        {...rest}
      />
    </Section>
  );
};

/**
 * Specialized dropzone for CSV files.
 *
 * Rest of the props are passed to the Dropzone component.
 */
const CsvDropzone = <T extends object>(
  props: PropsWithChildren<CsvDropzoneProps<T>>
) => <CsvDropzoneWithContext {...props} />;

export default CsvDropzone;
