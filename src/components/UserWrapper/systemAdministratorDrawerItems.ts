import {
  // AccountGroupOutline as AccountGroupOutlineIcon,
  CashRegister as CashierIcon,
  FormatListBulleted as ProductIcon,
  Wrench as ServiceIcon,
  Store as StoreIcon,
} from 'mdi-material-ui';

export const systemAdministratorDrawerItems = [
  // {
  //   label: 'Business Owners',
  //   Icon: AccountGroupOutlineIcon,
  //   path: 'businessOwners',
  //   hasDivider: true,
  // },
  {
    label: 'Stores',
    Icon: StoreIcon,
    path: 'stores',
    hasDivider: false,
  },
  {
    label: 'Products',
    Icon: ProductIcon,
    path: 'products',
    hasDivider: false,
  },
  {
    label: 'Services',
    Icon: ServiceIcon,
    path: 'services',
    hasDivider: false,
  },
  {
    label: 'Cashiers',
    Icon: CashierIcon,
    path: 'cashiers',
    hasDivider: false,
  },
];
