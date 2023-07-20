import React, { FC } from 'react';

import { Box } from '@mui/material';
import clsx from 'clsx';
import DropzoneUploaderDefault, {
  IDropzoneProps,
} from 'react-dropzone-uploader';

import { dropzoneStyles } from './dropzoneStyles';
import InputContent from './InputContent';
import InputWithFilesContent from './InputWithFilesContent';
import Preview from './Preview';
import SubmitButton from './SubmitButton';
export interface DropzoneProps extends Partial<IDropzoneProps> {
  resetPreview?: boolean;
  submitButtonLabel?: string;
  /**
   * Make the dropzone red when there is an error.
   */
  error?: boolean;
}

// https://github.com/vitejs/vite/issues/2139#issuecomment-802981228
const DropzoneUploader: typeof DropzoneUploaderDefault =
  // @ts-ignore
  DropzoneUploaderDefault.default
    ? // @ts-ignore
      DropzoneUploaderDefault.default
    : DropzoneUploaderDefault;

const DropzoneWithContext: FC<DropzoneProps> = ({
  resetPreview,
  maxFiles = 1,
  submitButtonLabel,
  error = false,
  ...rest
}) => (
  <Box sx={dropzoneStyles} className={clsx({ 'dzu-custom--error': error })}>
    <DropzoneUploader
      {...rest}
      maxFiles={maxFiles}
      inputContent={InputContent}
      SubmitButtonComponent={(props) => (
        <SubmitButton {...props} submitButtonLabel={submitButtonLabel} />
      )}
      PreviewComponent={(previewProps) =>
        Preview({ ...previewProps, resetPreview })
      }
      inputWithFilesContent={InputWithFilesContent}
    />
  </Box>
);

/**
 * Custom Dropzone component based on react-dropzone-uploader.
 */
const Dropzone: FC<DropzoneProps> = (props) => (
  <DropzoneWithContext {...props} />
);

export default Dropzone;
