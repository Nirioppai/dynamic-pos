import { FC } from 'react';

import type { DialogProps } from '@mui/material';

import BusinessOwnerCashierModalForm from './BusinessOwnerCashierModalForm';

import { FormDialog } from '~/components';
import { KEYS } from '~/constants';
import { usePutMutation } from '~/hooks';
import { BaseSchema, CashierSchema, cashierSchema } from '~/schemas';
import { cashiersService2 } from '~/services';

const EditOwnerCashierModal: FC<
  DialogProps & {
    data: BaseSchema & CashierSchema;
    setData: (data: BaseSchema & CashierSchema) => void;
  }
> = ({ data, setData, onClose, ...rest }) => {
  const { mutateAsync } = usePutMutation({
    queryKey: KEYS.cashiers,
    mutationFn: cashiersService2.putOneCashier,
  });

  const { _id, ...defaultValues } = data;

  const onSubmit = async (values: CashierSchema) =>
    await mutateAsync({ id: _id, item: { ...defaultValues, ...values } });

  return (
    <FormDialog
      title='Edit Cashier'
      subtitle={data.name}
      defaultValues={defaultValues}
      schema={cashierSchema}
      onFormSubmit={onSubmit}
      submitText='Update'
      onClose={onClose}
      {...rest}
    >
      <BusinessOwnerCashierModalForm action='Edit' />
    </FormDialog>
  );
};

export default EditOwnerCashierModal;
