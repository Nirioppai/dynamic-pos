import { TextFieldElement } from 'react-hook-form-mui';

const BusinessOwnerStoreModalForm = () => (
  <>
    <TextFieldElement name='name' label='Store Name' required />

    <TextFieldElement name='businessAddress' label='Store Address' required />
  </>
);

export default BusinessOwnerStoreModalForm;
