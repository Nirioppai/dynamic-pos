import { TextFieldElement } from 'react-hook-form-mui';

export const OwnerName = () => (
  <TextFieldElement name='ownerName' label='Owner Name' required />
);

export const BusinessName = () => (
  <TextFieldElement name='businessName' label='Business Name' required />
);

export const BusinessAddress = () => (
  <TextFieldElement name='businessAddress' label='Business Name' required />
);

export const BusinessTIN = () => (
  <TextFieldElement name='businessTIN' label='Business TIN Number' required />
);

export const BusinessNature = () => (
  <TextFieldElement name='businessNature' label='Nature of Business' required />
);
