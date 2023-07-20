import React, { FC, ReactNode } from 'react';

import { Box, Button, Typography } from '@mui/material';
import type { ButtonProps, TypographyTypeMap } from '@mui/material';

import getIcon from './getIcon';

export interface AttachmentProps extends ButtonProps {
  /**
   * Attachment icon to be displayed.
   * This can also be used for overriding the provided icon.
   */
  icon?: ReactNode;
  /**
   * If set to true, all text will be wrapped and will not be truncated
   * by an ellipsis
   */
  disableTruncation?: boolean;
  /**
   * If the extension is not included in the `primaryText` prop,
   * it can be set here. Alternatively, this can be used to override
   * the extension of the file and its associated icon.
   */
  extension?: string;
  /**
   * File name of the attachment.
   * Also used for determining the file type icon via file extension.
   */
  primaryText: string;
  /**
   * Props applied to the primary text (Typography) component.
   */
  primaryTextProps?: TypographyTypeMap;
  /**
   * If set to `true`, the file extension from `primaryText` will not
   * be included in render.
   */
  removeExtensionText?: boolean;
  /**
   * Optional secondary text.
   * This could be anything like file type, size, description, etc.
   */
  secondaryText?: string;
  /**
   * Props applied to the secondary text (Typography) component.
   */
  secondaryTextProps?: TypographyTypeMap;
}

/**
 * Custom Button component that is used for file attachments.
 *
 * This automatically detects the file type and respective icon of the
 * given file if it is supplied to the `primaryText` prop. Full list of
 * known extensions with respective icons can be found on `getIcon.tsx`.
 *
 * Max width of this component is set to 300px to prevent very long file
 * names, but can be overridden if needed.
 *
 * Rest of props go directly to the Button component.
 */
const Attachment: FC<AttachmentProps> = ({
  className,
  disableTruncation = false,
  extension,
  icon,
  primaryText,
  primaryTextProps,
  removeExtensionText,
  secondaryText,
  secondaryTextProps,
  size = 'medium',
  variant = 'outlined',
  ...rest
}) => {
  const splitFileName = primaryText.split('.');
  const extractedExtension = splitFileName.pop() || '';
  const extractedFileName = splitFileName.join('.') || '';

  const ellipsisStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  return (
    <Button
      {...rest}
      sx={{
        maxWidth: 300,
        '& .MuiButton-startIcon': {
          '&.MuiButton-iconSizeSmall > *:first-child': {
            fontSize: '1.25rem',
          },
          '&.MuiButton-iconSizeMedium > *:first-child': {
            fontSize: '1.5rem',
          },
          '&.MuiButton-iconSizeLarge > *:first-child': {
            mr: 1,
            fontSize: '2rem',
          },
        },
      }}
      variant={variant}
      size={size}
      startIcon={icon || getIcon(extension || extractedExtension)}
    >
      <Box
        component='span'
        sx={[
          {
            display: 'block',
          },
          !disableTruncation && ellipsisStyle,
        ]}
      >
        <Typography
          {...primaryTextProps}
          sx={[
            (theme) => ({
              display: 'block',
              textAlign: 'left',
              fontWeight: theme.typography.fontWeightMedium,
            }),
            size === 'small' &&
              ((theme) => ({
                fontSize: theme.typography.pxToRem(12),
              })),
            !disableTruncation && ellipsisStyle,
          ]}
        >
          {removeExtensionText ? extractedFileName : primaryText}
        </Typography>
        {secondaryText && (
          <Typography
            {...secondaryTextProps}
            sx={[
              (theme) => ({
                display: 'block',
                textAlign: 'left',
                fontSize: theme.typography.pxToRem(12),
              }),
              size === 'small' &&
                ((theme) => ({ fontSize: theme.typography.pxToRem(10) })),
              variant !== 'contained' &&
                ((theme) => ({ color: theme.palette.text.secondary })),
              !disableTruncation && ellipsisStyle,
            ]}
          >
            {secondaryText}
          </Typography>
        )}
      </Box>
    </Button>
  );
};

export default Attachment;
