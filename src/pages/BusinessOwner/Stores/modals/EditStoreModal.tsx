import { FC } from 'react';

import type { DialogProps } from '@mui/material';

import BusinessOwnerStoreModalForm from './BusinessOwnerStoreModalForm';

import { FormDialog } from '~/components';
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
    <FormDialog
      title='Edit Store'
      subtitle={data.name}
      defaultValues={defaultValues}
      schema={storeSchema}
      onFormSubmit={onSubmit}
      submitText='Update'
      onClose={onClose}
      {...rest}
    >
      <BusinessOwnerStoreModalForm />
    </FormDialog>
  );
};

export default EditEquipmentModal;
