import { FC } from 'react';

import type { DialogProps } from '@mui/material';

import {
  StoreCashierGrid,
  StoreCategoryGrid,
  StoreOverviewGrid,
  StoreProductsGrid,
  StoreServicesGrid,
} from './index';

import {
  // FormDialog,
  FullScreenDialog,
  TabWithContent,
} from '~/components';
import { KEYS } from '~/constants';
import { usePutMutation } from '~/hooks';
import { BaseSchema, StoreSchema, storeSchema } from '~/schemas';
import { storesService2 } from '~/services';

const EditEquipmentModal: FC<
  DialogProps & {
    data: BaseSchema & StoreSchema;
    setData: (data: BaseSchema & StoreSchema) => void;
  }
> = ({ data, setData, onClose, ...rest }) => {
  const { mutateAsync } = usePutMutation({
    queryKey: KEYS.storeInstances,
    mutationFn: storesService2.putOne,
  });

  const { _id, ...defaultValues } = data;

  const onSubmit = async (values: StoreSchema) =>
    await mutateAsync({ id: _id, item: { ...defaultValues, ...values } });

  return (
    <>
      <FullScreenDialog
        onClose={onClose}
        title={'Editing Store ' + data.name}
        {...rest}
      >
        <TabWithContent
          tabItems={[
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
              content: <StoreProductsGrid storeId={data._id} />,
            },
            {
              name: 'Services',
              content: <StoreServicesGrid storeId={data._id} />,
            },
            {
              name: 'Categories',
              content: <StoreCategoryGrid storeId={data._id} />,
            },
            {
              name: 'Cashiers',
              content: <StoreCashierGrid storeId={data._id} />,
            },
          ]}
        />
      </FullScreenDialog>
    </>
  );
};

export default EditEquipmentModal;
