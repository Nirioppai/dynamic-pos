// app info
export const APP_NAME: string = import.meta.env.VITE_APP_NAME;
export const APP_DESCRIPTION: string = import.meta.env.VITE_APP_DESCRIPTION;

// formats
export const DATE_FORMAT: string =
  import.meta.env.VITE_DATE_FORMAT || 'MM/dd/yyyy';
export const TIME_FORMAT: string =
  import.meta.env.VITE_TIME_FORMAT || 'hh:mm b';

// user types

export const USER_TYPES = [
  {
    label: 'System Administrator',
    value: 'systemAdministrator',
  },
  {
    label: 'Business Owner',
    value: 'businessOwner',
  },
  {
    label: 'Cashier',
    value: 'cashier',
  },
];
