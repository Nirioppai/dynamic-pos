import { alpha } from '@mui/material';
import type { Theme } from '@mui/material';

export const dropzoneStyles = (theme: Theme) => ({
  '& .dzu-dropzone': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    margin: '0 auto',
    position: 'relative',
    boxSizing: 'border-box',
    transition: 'all 0.15s',
    border: `2px dashed ${theme.palette.divider}`,
    borderRadius: 1,
    padding: '30px',
  },
  '& .dzu-dropzoneActive': {
    backgroundColor: alpha(theme.palette.primary.main, 0.025),
    borderColor: theme.palette.primary.main,
    '& .dzu-inputLabel': {
      color: theme.palette.primary.main,
    },
  },
  '& .dzu-dropzoneDisabled': {
    opacity: 0.5,
  },
  '& .dzu-dropzoneDisabled *:hover': {
    cursor: 'unset',
  },
  '& .dzu-input': {
    display: 'none',
  },
  '& .dzu-inputLabel': {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: theme.spacing(2),
    fontWeight: 500,
    color: theme.palette.text.secondary,
    transition: 'color 0.15s',
    cursor: 'pointer',
    width: 'calc(100% + 60px)',
    height: '100%',
    margin: '-30px',
    padding: '30px',
  },
  '& .dzu-inputLabelWithFiles': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: '6px 16px',
    lineHeight: 1.75,
    minHeight: 32,
    // backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    // border: 'none',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
    borderRadius: 1,
    fontSize: 14,
    fontWeight: 500,
    mt: '20px',
    // marginLeft: '3%',
    cursor: 'pointer',
    transition:
      theme.transitions.create(['border-color', 'background-color'], {
        duration: theme.transitions.duration.shorter,
      }) + '!important',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      borderColor: theme.palette.primary.main,
    },
  },
  '& .dzu-previewContainer': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
    minHeight: 60,
    zIndex: 1,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxSizing: 'border-box',
  },
  '& .dzu-previewStatusContainer': {
    display: 'flex',
    alignItems: 'center',
  },
  '& .dzu-previewFileName': {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.text.primary,
  },
  '& .dzu-previewImage': {
    width: 'auto',
    maxHeight: 40,
    maxWidth: 140,
    borderRadius: '4px',
  },
  '& .dzu-previewButton': {
    backgroundSize: '14px 14px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: 14,
    height: 14,
    cursor: 'pointer',
    opacity: 0.9,
    margin: '0 0 2px 10px',
    color: theme.palette.text.primary,
  },
  '& .dzu-submitButtonContainer': {
    width: '100%',
    mt: '30px',
  },
  '&.dzu-custom': {
    '&--error': {
      '& .dzu-dropzone': {
        borderColor: theme.palette.error.main,
      },
      '& .dzu-inputLabel': {
        color: theme.palette.error.main,
      },
    },
  },
});
