import React, { FC } from 'react';

import { Box, Button } from '@mui/material';
import { ISubmitButtonProps } from 'react-dropzone-uploader';

const SubmitButton: FC<
  ISubmitButtonProps & {
    submitButtonLabel?: string;
  }
> = ({
  onSubmit,
  files,
  buttonClassName,
  buttonStyle,
  submitButtonLabel,
  ...rest
}) => {
  const _disabled =
    files.some((f) =>
      ['preparing', 'getting_upload_params', 'uploading'].includes(
        f.meta.status
      )
    ) ||
    !files.some((f) => ['headers_received', 'done'].includes(f.meta.status));

  const handleSubmit = () => {
    onSubmit(
      files.filter((f) => ['headers_received', 'done'].includes(f.meta.status))
    );
  };

  return (
    <Box display='flex' justifyContent='flex-end' width='100%'>
      <div>
        {/* @ts-ignore */}
        <Button
          {...rest}
          variant='contained'
          onClick={handleSubmit}
          disabled={_disabled}
        >
          {submitButtonLabel ?? 'Submit'}
        </Button>
      </div>
    </Box>
  );
};

export default SubmitButton;
