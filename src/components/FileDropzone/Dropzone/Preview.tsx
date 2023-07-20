import React, { FC, useEffect } from 'react';

import { IconButton, Typography } from '@mui/material';
import {
  Close as CloseIcon,
  Pause as PauseIcon,
  Play as PlayIcon,
} from 'mdi-material-ui';
import {
  IPreviewProps,
  formatBytes,
  // formatDuration,
} from 'react-dropzone-uploader';

import CircularProgressWithLabel from './CircularProgressWithLabel';

interface IPreview extends IPreviewProps {
  resetPreview?: boolean;
}

const Preview: FC<IPreview> = (props) => {
  const {
    resetPreview,
    className,
    imageClassName,
    style,
    imageStyle,
    fileWithMeta: { cancel, remove, restart },
    meta: {
      name = '',
      percent = 0,
      size = 0,
      previewUrl,
      status,
      // duration,
      validationError,
    },
    isUpload,
    canCancel,
    canRemove,
    canRestart,
    extra: { minSizeBytes },
  } = props;

  useEffect(() => {
    if (resetPreview) {
      remove();
    }
  }, [resetPreview, remove]);

  let title = name.split('.')[0] || 'Unnamed file';
  const subtitle = `${
    name.split('.').pop()?.toUpperCase() || 'File'
  }, ${formatBytes(size)}`;
  // if (duration) title = `${title}, ${formatDuration(duration)}`;

  if (status === 'error_file_size' || status === 'error_validation') {
    return (
      <div className={className} style={style}>
        <div>
          <Typography>{title}</Typography>
          <Typography color='textSecondary'>{subtitle}</Typography>
        </div>
        {status === 'error_file_size' && (
          <span>{size < minSizeBytes ? 'File too small' : 'File too big'}</span>
        )}
        {status === 'error_validation' && (
          <span>{String(validationError)}</span>
        )}
        {canRemove && (
          <IconButton edge='end' aria-label='remove' onClick={remove}>
            <CloseIcon />
          </IconButton>
        )}
      </div>
    );
  }

  if (
    status === 'error_upload_params' ||
    status === 'exception_upload' ||
    status === 'error_upload'
  ) {
    title = `${title} (upload failed)`;
  }
  if (status === 'aborted') title = `${title} (cancelled)`;

  return (
    <div className={className} style={style}>
      <div style={{ display: 'flex' }}>
        {previewUrl && (
          <img
            className={imageClassName}
            style={{ marginRight: '1rem', ...imageStyle }}
            src={previewUrl}
            alt={title}
            title={title}
          />
        )}
        <div>
          <Typography style={{ fontWeight: 'bold' }}>{title}</Typography>
          <Typography color='textSecondary'>{subtitle}</Typography>
        </div>
      </div>

      <div className='dzu-previewStatusContainer'>
        {isUpload && (
          <CircularProgressWithLabel
            value={
              status === 'done' || status === 'headers_received' ? 100 : percent
            }
          />
        )}

        {status === 'uploading' && canCancel && (
          <IconButton edge='end' aria-label='cancel' onClick={cancel}>
            <PauseIcon />
          </IconButton>
        )}
        {status !== 'preparing' &&
          status !== 'getting_upload_params' &&
          status !== 'uploading' &&
          canRemove && (
            <IconButton edge='end' aria-label='remove' onClick={remove}>
              <CloseIcon />
            </IconButton>
          )}
        {[
          'error_upload_params',
          'exception_upload',
          'error_upload',
          'aborted',
          'ready',
        ].includes(status) &&
          canRestart && (
            <IconButton edge='end' aria-label='restart' onClick={restart}>
              <PlayIcon />
            </IconButton>
          )}
      </div>
    </div>
  );
};

export default Preview;
