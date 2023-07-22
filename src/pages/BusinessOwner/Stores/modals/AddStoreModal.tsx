import { FC } from 'react';

import type { DialogProps } from '@mui/material';
import { useSnackbar } from 'notistack';

import AddBusinessDetailsForm from '../../BusinessDetails/AddBusinessDetailsForm';

import { FormDialog } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { StoreSchema, storeSchema } from '~/schemas';
import { storesService } from '~/services';
import { validateSubmit } from '~/utils';
const AddStoreModal: FC<DialogProps> = ({ onClose, ...rest }) => {
  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.storeInstances,
    mutationFn: storesService.postOne,
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (values: StoreSchema) =>
    // @ts-ignore
    validateSubmit(values, storeSchema, mutateAsync, enqueueSnackbar);

  return (
    <FormDialog
      maxWidth={'md'}
      title='Add Store'
      defaultValues={{
        ownerId: auth?.currentUser?.uid,
        businessAddress: '',
      }}
      schema={storeSchema}
      onFormSubmit={onSubmit}
      submitText='Add'
      onClose={onClose}
      {...rest}
    >
      <AddBusinessDetailsForm />
    </FormDialog>
  );
};

export default AddStoreModal;
