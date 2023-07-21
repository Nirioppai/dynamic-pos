import { Typography } from '@mui/material';
import { TextFieldElement } from 'react-hook-form-mui';

import { Attachment } from '~/components';

const BusinessOwnerStoreModalForm = () => (
  <>
    <Typography variant='h2' gutterBottom sx={{ mb: '20px' }}>
      Business Details
    </Typography>
    <TextFieldElement name='ownerName' label='Owner Name' required disabled />
    <TextFieldElement
      name='businessName'
      label='Name of Business'
      required
      disabled
    />
    <TextFieldElement
      name='businessAddress'
      label='Business Address'
      required
      disabled
    />
    <TextFieldElement
      name='businessTIN'
      label='Business TIN Number'
      required
      disabled
    />
    <TextFieldElement
      name='businessNature'
      label='Nature of Business'
      required
      disabled
    />
    <Typography variant='h2' gutterBottom sx={{ mb: '20px' }}>
      Business Documents
    </Typography>

    <Attachment
      primaryText={'DTI Business Name Registration'}
      secondaryText='PDF'
      extension='pdf'
      style={{ marginBottom: '1rem', marginRight: '1rem' }}
      size='large'
      variant='outlined'
      color='primary'
      // onClick={() => csvLink?.current?.link?.click?.()}
    />
    <Attachment
      primaryText={"Baranggay Permit/Mayor's permit"}
      secondaryText='PDF'
      extension='pdf'
      style={{ marginBottom: '1rem', marginRight: '1rem' }}
      size='large'
      variant='outlined'
      color='primary'
      // onClick={() => csvLink?.current?.link?.click?.()}
    />
    <Attachment
      primaryText={'BIR Permit'}
      secondaryText='PDF'
      extension='pdf'
      style={{ marginBottom: '1rem' }}
      size='large'
      variant='outlined'
      color='primary'
      // onClick={() => csvLink?.current?.link?.click?.()}
    />
  </>
);

export default BusinessOwnerStoreModalForm;
