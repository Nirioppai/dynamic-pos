import { SelectElement, TextFieldElement } from 'react-hook-form-mui';

import { NumberFieldElement } from '~/components';

const BusinessOwnerProductModalForm = () => (
  <>
    <TextFieldElement name='name' label='Product Name' required />
    <NumberFieldElement name='price' label='Price' required />
    <TextFieldElement name='description' label='Description' />
    <SelectElement
      name='availability'
      label='Availability'
      labelKey='id'
      options={[{ id: 'Available' }, { id: 'Unavailable' }]}
      required
    />
  </>
);

export default BusinessOwnerProductModalForm;
