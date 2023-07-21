import { FC } from 'react';

import type { DialogProps } from '@mui/material';
import { setRecoil } from 'recoil-nexus';

import StoreSalesGrid from './StoreSalesGrid';

import {
  StoreCashierGrid,
  // StoreCategoryGrid,
  StoreOverviewGrid,
  StoreProductsGrid,
  StoreServicesGrid,
} from './index';

import {
  // FormDialog,
  FullScreenDialog,
  TabWithContent,
} from '~/components';
import { selectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { usePutMutation } from '~/hooks';
import { BaseSchema, StoreSchema, storeSchema } from '~/schemas';
import { storesService2 } from '~/services';

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
  const { mutateAsync } = usePutMutation({
    queryKey: KEYS.storeInstances,
    mutationFn: storesService2.putOne,
  });

  const { _id, ...defaultValues } = data;

  const onSubmit = async (values: StoreSchema) =>
    await mutateAsync({ id: _id, item: { ...defaultValues, ...values } });

  setRecoil(selectedStore, data._id);

  console.log('defaultValues: ', defaultValues);

  const acceptedItems = [
    {
      name: 'Overview',
      content: (
        <StoreOverviewGrid
          defaultValues={defaultValues}
          schema={storeSchema}
          onSubmit={onSubmit}
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
    // {
    //   name: 'Categories',
    //   content: (
    //     <StoreCategoryGrid
    //       storeId={data._id}
    //       disableWrite={disableWrite}
    //     />
    //   ),
    // },
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
          onSubmit={onSubmit}
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
