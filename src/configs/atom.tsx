import { atom } from 'recoil';

export const selectedStore = atom({
  key: 'selectedStore',
  default: '',
});

export const modalState = atom({
  key: 'selectedStore',
  default: 'closed',
});
