import { Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { CheckboxElement, TextFieldElement } from 'react-hook-form-mui';

import { Attachment } from '~/components';

interface BusinessOwnerStoreModalFormProps {
  enabledEditing: boolean;
}

const BusinessOwnerStoreModalForm: React.FC<
  BusinessOwnerStoreModalFormProps
> = ({ enabledEditing }) => {
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
      <TextFieldElement
        name='ownerName'
        label='Owner Name'
        required
        disabled={enabledEditing === true ? false : true}
      />
      <TextFieldElement
        name='businessName'
        label='Name of Business'
        required
        disabled={enabledEditing === true ? false : true}
      />
      <TextFieldElement
        name='businessAddress'
        label='Business Address'
        required
        disabled={enabledEditing === true ? false : true}
      />
      <TextFieldElement
        name='businessTIN'
        label='Business TIN Number'
        required
        disabled={enabledEditing === true ? false : true}
      />
      <TextFieldElement
        name='businessNature'
        label='Nature of Business'
        required
        disabled={enabledEditing === true ? false : true}
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

      <Typography variant='h2' gutterBottom sx={{ mb: '20px' }}>
        Provide Feedback to Business Owner
      </Typography>

      <CheckboxElement label='Business Approved' name='status' disabled />

      <TextFieldElement
        label='System Administrator Remarks'
        name='remarks'
        disabled
      />
    </>
  );
};

export default BusinessOwnerStoreModalForm;
