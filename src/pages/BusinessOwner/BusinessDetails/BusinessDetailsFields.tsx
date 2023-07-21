import { TextFieldElement } from 'react-hook-form-mui';

export const TextField1 = () => (
  <TextFieldElement name='name' label='Store Name' required disabled />
);

export const TextField2 = () => (
  <TextFieldElement name='address' label='Store Address' required disabled />
);
