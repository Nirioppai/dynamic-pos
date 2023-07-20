import React, { FC, Fragment } from 'react';

import { CloudUpload as CloudUploadIcon } from 'mdi-material-ui';

const InputContentWithContext: FC = () => {
  return (
    <>
      <CloudUploadIcon style={{ fontSize: '6rem' }} />
      {/* Arbitrary max width */}
      <span style={{ maxWidth: 230, textAlign: 'center' }}>
        {'Drag and drop file here or click here to browse files'}
      </span>
    </>
  );
};

const InputContent: FC = () => <InputContentWithContext />;

export default InputContent;
