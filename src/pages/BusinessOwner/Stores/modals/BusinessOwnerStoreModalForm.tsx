import { TextFieldElement } from 'react-hook-form-mui';

const BusinessOwnerStoreModalForm = () => (
  <>
    <TextFieldElement name='name' label='Store Name' required disabled />

    <TextFieldElement name='address' label='Store Address' required disabled />
  </>
);

export default BusinessOwnerStoreModalForm;
