import { Typography } from '@mui/material';
import { CheckboxElement, TextFieldElement } from 'react-hook-form-mui';

import AdminStoreOverviewForms from './AdminStoreOverviewForms';

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
  console.log(defaultValues);
  return (
    <div>
      <FormContainerComponent
        defaultValues={defaultValues}
        schema={schema}
        onFormSubmit={onSubmit}
        enabledEditing={true}
      >
        <Section gutterBottom>
          <AdminStoreOverviewForms />

          <Typography variant='h2' gutterBottom sx={{ mb: '20px' }}>
            Provide Feedback to Business Owner
          </Typography>

          <TextFieldElement label='Remarks' name='remarks' />

          <CheckboxElement
            label='Approval Business (You can only approve once, check the requirements carefully.)'
            name='status'
          />
        </Section>
      </FormContainerComponent>
    </div>
  );
};

export default StoreOverviewGrid;
