import { Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { TextFieldElement } from 'react-hook-form-mui';

import { Attachment } from '~/components';

const BusinessOwnerStoreModalForm = () => {
  // Get the form data using useFormContext
  const { watch } = useFormContext();

  // Use the watch function to get the values of the documents
  const documentBIRPermit = watch('documentBIRPermit');
  const documentMayorsPermit = watch('documentMayorsPermit');
  const documentDTIBusinessName = watch('documentDTIBusinessName');

  return (
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

      {/* documentBIRPermit  */}

      <Attachment
        primaryText={'DTI Business Name Registration'}
        secondaryText='PDF'
        extension='pdf'
        style={{ marginBottom: '1rem', marginRight: '1rem' }}
        size='large'
        variant='outlined'
        color='primary'
        onClick={() => window.open(documentDTIBusinessName, '_blank')}
      />
      <Attachment
        primaryText={"Baranggay Permit/Mayor's permit"}
        secondaryText='PDF'
        extension='pdf'
        style={{ marginBottom: '1rem', marginRight: '1rem' }}
        size='large'
        variant='outlined'
        color='primary'
        onClick={() => window.open(documentMayorsPermit, '_blank')}
      />
      <Attachment
        primaryText={'BIR Permit'}
        secondaryText='PDF'
        extension='pdf'
        style={{ marginBottom: '1rem' }}
        size='large'
        variant='outlined'
        color='primary'
        onClick={() => window.open(documentBIRPermit, '_blank')}
      />
    </>
  );
};

export default BusinessOwnerStoreModalForm;
