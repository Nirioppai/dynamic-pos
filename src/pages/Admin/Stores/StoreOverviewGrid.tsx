import { Typography } from '@mui/material';
import { CheckboxElement } from 'react-hook-form-mui';

import BusinessOwnerStoreModalForm from '../../BusinessOwner/Stores/modals/BusinessOwnerStoreModalForm';

import { FormContainerComponent, Section } from '~/components';
import { storeSchema } from '~/schemas';

const StoreOverviewGrid = ({
  defaultValues,
  schema,
  onSubmit,
}: {
  defaultValues: any;
  schema: typeof storeSchema;
  onSubmit: any;
}) => {
  return (
    <div>
      <FormContainerComponent
        defaultValues={defaultValues}
        schema={schema}
        onFormSubmit={onSubmit}
        enabledEditing={true}
      >
        <Section gutterBottom>
          <BusinessOwnerStoreModalForm />

          <Typography variant='h2' gutterBottom sx={{ mb: '20px' }}>
            Provide Remarks to Business Owner
          </Typography>

          <CheckboxElement label='Approval Status' name='status' />
        </Section>
      </FormContainerComponent>
    </div>
  );
};

export default StoreOverviewGrid;
