import { FC } from 'react';

import type { DialogProps } from '@mui/material';
import { getRecoil } from 'recoil-nexus';

import BusinessOwnerCashierModalForm from './BusinessOwnerCashierModalForm';

import { FormDialog } from '~/components';
import { auth, selectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { CashierSchema, cashierSchema } from '~/schemas';
import { cashiersService } from '~/services';

const AddOwnerCashierModal: FC<DialogProps> = ({ onClose, ...rest }) => {
  const storeId = getRecoil(selectedStore);
  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.cashiers,
    mutationFn: cashiersService.postOneCashierInsideStore,
  });

  const onSubmit = async (values: CashierSchema) => await mutateAsync(values);

  return (
    <FormDialog
      title='Add Cashier'
      defaultValues={{
        name: '',
        ownerId: auth?.currentUser?.uid,
        storeId: storeId,
      }}
      schema={cashierSchema.omit({ email: true })}
      onFormSubmit={onSubmit}
      submitText='Add'
      onClose={onClose}
      {...rest}
    >
      <BusinessOwnerCashierModalForm />
    </FormDialog>
  );
};

export default AddOwnerCashierModal;
