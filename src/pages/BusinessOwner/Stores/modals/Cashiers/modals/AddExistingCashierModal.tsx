import { FC, useEffect } from 'react';

import type { DialogProps } from '@mui/material';
import { useQueries } from 'react-query';
import { getRecoil } from 'recoil-nexus';

import { FormDialog, SelectDropdownElement } from '~/components';
import { auth, selectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { CashierSchema, cashierSchema } from '~/schemas';
import { cashiersService } from '~/services';

const AddExistingCashierModal: FC<DialogProps> = ({ onClose, ...rest }) => {
  const storeId = getRecoil(selectedStore);

  const queries = useQueries([
    {
      queryKey: 'allCashiers',
      queryFn: () => cashiersService.getCashiers(auth?.currentUser?.uid || ''),
    },
    {
      queryKey: 'storeCashiers',
      queryFn: () => cashiersService.getCashiersInStore(storeId || ''),
    },
  ]);

  const allCashiers = queries[0].data || [];
  const storeCashiers = queries[1].data || [];

  useEffect(() => {
    queries.forEach((q) => q.refetch());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getUnassignedCashiers(
    storeCashiers: CashierSchema,
    allCashiers: CashierSchema
  ) {
    // @ts-ignore
    const unassignedCashiers = allCashiers.filter((cashier: CashierSchema) => {
      // @ts-ignore
      return !storeCashiers.some(
        // @ts-ignore
        (storeCashier) => storeCashier._id === cashier._id
      );
    });
    return unassignedCashiers;
  }

  const unassignedCashiers = getUnassignedCashiers(storeCashiers, allCashiers);

  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.cashiers,
    mutationFn: cashiersService.postOneExistingCashierInsideStore,
  });

  const onSubmit = async (values: CashierSchema) => {
    await mutateAsync(values);
  };

  return (
    <FormDialog
      title='Add From Existing Cashiers'
      defaultValues={{
        ownerId: auth?.currentUser?.uid,
        name: '',
        // @ts-ignore
        storeId: storeId,
      }}
      schema={cashierSchema}
      onFormSubmit={onSubmit}
      submitText='Add'
      onClose={onClose}
      {...rest}
    >
      <SelectDropdownElement
        name='name'
        label='Cashier Name'
        valueKey='_id'
        labelKey='name'
        options={unassignedCashiers}
        required
      />
    </FormDialog>
  );
};

export default AddExistingCashierModal;
