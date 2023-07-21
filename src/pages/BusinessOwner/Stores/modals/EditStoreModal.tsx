import { FC } from 'react';

import type { DialogProps } from '@mui/material';
import { setRecoil } from 'recoil-nexus';

import StoreSalesGrid from './StoreSalesGrid';

import {
  StoreCashierGrid,
  StoreOverviewGrid,
  StoreProductsGrid,
  StoreServicesGrid,
} from './index';

import { FullScreenDialog, TabWithContent } from '~/components';
import { selectedStore } from '~/configs';
import { BaseSchema, StoreSchema, storeSchema } from '~/schemas';

type CombinedProps = DialogProps & {
  data: BaseSchema & StoreSchema;
  setData: (data: BaseSchema & StoreSchema) => void;
  disableWrite?: boolean;
};

const EditStoreModal: FC<CombinedProps> = ({
  data,
  setData,
  onClose,
  disableWrite,
  ...rest
}) => {
  const { _id, ...defaultValues } = data;
  setRecoil(selectedStore, data._id);

  console.log('defaultValues: ', defaultValues);

  const acceptedItems = [
    {
      name: 'Overview',
      content: (
        <StoreOverviewGrid
          defaultValues={defaultValues}
          schema={storeSchema}
          storeId={data._id}
        />
      ),
    },
    {
      name: 'Products',
      content: (
        <StoreProductsGrid storeId={data._id} disableWrite={disableWrite} />
      ),
    },
    {
      name: 'Services',
      content: (
        <StoreServicesGrid storeId={data._id} disableWrite={disableWrite} />
      ),
    },

    {
      name: 'Cashiers',
      content: (
        <StoreCashierGrid storeId={data._id} disableWrite={disableWrite} />
      ),
    },
    {
      name: 'Sales',
      content: (
        <StoreSalesGrid storeId={data._id} disableWrite={disableWrite} />
      ),
    },
  ];

  const pendingItems = [
    {
      name: 'Overview',
      content: (
        <StoreOverviewGrid
          defaultValues={defaultValues}
          schema={storeSchema}
          storeId={data._id}
        />
      ),
    },
  ];

  return (
    <>
      <FullScreenDialog
        onClose={onClose}
        title={'Viewing Store ' + data.businessName}
        {...rest}
      >
        <TabWithContent
          tabItems={
            defaultValues.status === false ? pendingItems : acceptedItems
          }
        />
      </FullScreenDialog>
    </>
  );
};

export default EditStoreModal;
