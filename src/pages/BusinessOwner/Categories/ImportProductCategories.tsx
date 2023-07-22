import { FC } from 'react';

import { Typography } from '@mui/material';

import { CsvDropzone } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { ProductCategorySchema, productCategorySchema } from '~/schemas';
import { categoriesService } from '~/services';

const ImportProductCategories: FC = () => {
  return (
    <CsvDropzone<ProductCategorySchema>
      error={false}
      sampleFileName='Product Categories Sample File'
      csvHeaders={['name']}
      queryKey={KEYS.productCategories}
      uniqueColumns={['name']}
      // @ts-ignore
      dynamicAssignments={async (content) => {
        // ** This is to replace the modified content above
        const modifiedContent = content.map((row) => ({
          ...row,
          ownerId: auth?.currentUser?.uid,
        }));

        // content validation moved here
        // this is to reduce the number of requests to the server
        const mergedContent = content.map((row, idx) => ({
          ...row,
          ...modifiedContent[idx],
        }));

        return mergedContent;
      }}
      unflattenObject
      validationSchema={productCategorySchema}
      mutationFn={categoriesService.postManyProductCategories}
    >
      <details>
        <Typography component='summary'>Required fields:</Typography>
        <Typography component='ul'>
          <li>name</li>
        </Typography>
      </details>
    </CsvDropzone>
  );
};

export default ImportProductCategories;
