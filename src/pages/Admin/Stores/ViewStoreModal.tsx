import { FC } from 'react';

import type { DialogProps } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { setRecoil } from 'recoil-nexus';

import StoreOverviewGrid from './StoreOverviewGrid';

import {
  // FormDialog,
  FullScreenDialog,
} from '~/components';
import { db, selectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { usePutMutation } from '~/hooks';
import { BaseSchema, StoreSchema, storeSchema } from '~/schemas';
import { storesService2 } from '~/services';

type CombinedProps = DialogProps & {
  data: BaseSchema & StoreSchema;
  setData: (data: BaseSchema & StoreSchema) => void;
  disableWrite?: boolean;
};

const ViewStoreModal: FC<CombinedProps> = ({
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

  const onSubmit = async (values: StoreSchema) => {
    console.log('values: ', values);

    // Updating the user's status
    if (values.status === true) {
      try {
        // Get the user's document reference
        const userDocRef = doc(db, KEYS.users, values.ownerId);

        // Update the status field in the user's document
        await updateDoc(userDocRef, {
          status: 'Accepted',
        });

        console.log("User's status updated to 'Accepted'");
      } catch (error) {
        console.error('Failed to update user status:', error);
      }
    }

    await mutateAsync({ id: _id, item: { ...defaultValues, ...values } });
  };

  setRecoil(selectedStore, data._id);

  return (
    <>
      <FullScreenDialog
        onClose={onClose}
        title={'Viewing Store ' + data.businessName}
        {...rest}
      >
        <StoreOverviewGrid
          defaultValues={defaultValues}
          schema={storeSchema}
          onSubmit={onSubmit}
        />
      </FullScreenDialog>
    </>
  );
};

export default ViewStoreModal;
