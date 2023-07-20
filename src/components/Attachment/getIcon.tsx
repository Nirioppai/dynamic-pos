import React from 'react';

import {
  File,
  FileCode,
  FileDelimited,
  FileDocument,
  FileExcel,
  FileImage,
  FileMusic,
  FilePdfBox,
  FilePowerpoint,
  FileVideo,
  FileWord,
  ZipBox,
} from 'mdi-material-ui';

const getIcon = (extension: string) => {
  switch (extension.toLowerCase()) {
    case 'pdf':
      return <FilePdfBox />;
    case 'doc':
    case 'docm':
    case 'docx':
    case 'odt':
    case 'rtf':
    case 'xps':
      return <FileWord />;
    case 'ods':
    case 'xlam':
    case 'xls':
    case 'xlsx':
      return <FileExcel />;
    case 'odp':
    case 'ppt':
    case 'ppsx':
    case 'pptm':
    case 'pptx':
      return <FilePowerpoint />;
    case 'csv':
      return <FileDelimited />;
    case 'txt':
      return <FileDocument />;
    case 'bmp':
    case 'gif':
    case 'ico':
    case 'jpeg':
    case 'jpg':
    case 'png':
    case 'psd':
    case 'svg':
    case 'tif':
    case 'tiff':
    case 'webp':
      return <FileImage />;
    case '7z':
    case 'bz2':
    case 'gz':
    case 'iso':
    case 'rar':
    case 'tar':
    case 'xz':
    case 'zip':
      return <ZipBox />;
    case '3gp':
    case 'avi':
    case 'f4v':
    case 'flv':
    case 'm4v':
    case 'mkv':
    case 'mov':
    case 'mp4':
    case 'mpeg':
    case 'mpg':
    case 'mts':
    case 'webm':
    case 'wmv':
      return <FileVideo />;
    case 'aac':
    case 'aiff':
    case 'alac':
    case 'amr':
    case 'flac':
    case 'm4a':
    case 'mp3':
    case 'ogg':
    case 'opus':
    case 'wav':
    case 'wma':
      return <FileMusic />;
    case 'bat':
    case 'c':
    case 'cpp':
    case 'cs':
    case 'css':
    case 'go':
    case 'htm':
    case 'html':
    case 'ino':
    case 'js':
    case 'kt':
    case 'lua':
    case 'php':
    case 'py':
    case 'r':
    case 'rs':
    case 'sh':
    case 'vbs':
    case 'xhtml':
    case 'xml':
      return <FileCode />;
    default:
      return <File />;
  }
};

export default getIcon;
