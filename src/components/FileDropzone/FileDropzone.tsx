import React from 'react';

import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

interface FileDropzoneProps {
  handleOnSubmit: (files: any[]) => void;
  maxFiles?: number;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  handleOnSubmit,
  maxFiles = 1,
}) => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }: any) => {
    console.log(meta);
    return { url: 'https://httpbin.org/post' }; // replace this with your upload endpoint
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }: any, status: any) => {
    console.log(status, meta, file);
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files: any) => {
    handleOnSubmit(files);
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept='image/*, .pdf, text/csv'
      maxFiles={maxFiles}
      inputContent='Drop Files (or click to browse)'
      styles={{
        dropzone: { minHeight: 200, maxHeight: 250 },
      }}
    />
  );
};

export default FileDropzone;
