import React, { FC } from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';
import type { CircularProgressProps } from '@mui/material';
import { Check as CheckIcon } from 'mdi-material-ui';

const CircularProgressWithLabel: FC<
  { value: number } & CircularProgressProps
> = (props) => {
  return (
    <Box position='relative' display='inline-flex'>
      <CircularProgress variant='determinate' {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='caption' component='div' color='textSecondary'>
          {props.value > 100 ? (
            `${Math.round(props.value)}%`
          ) : (
            <CheckIcon style={{ marginBottom: -5 }} />
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
