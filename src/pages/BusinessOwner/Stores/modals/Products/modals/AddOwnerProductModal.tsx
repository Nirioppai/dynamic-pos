import { FC } from 'react';

import type { DialogProps } from '@mui/material';
import { getRecoil } from 'recoil-nexus';

import BusinessOwnerProductModalForm from './BusinessOwnerProductModalForm';

import { FormDialog } from '~/components';
import { auth, selectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { usePostMutation } from '~/hooks';
import { ProductSchema, productSchema } from '~/schemas';
import { productsService } from '~/services';

const AddOwnerProductModal: FC<DialogProps> = ({ onClose, ...rest }) => {
  const storeId = getRecoil(selectedStore);

  const { mutateAsync } = usePostMutation({
    queryKey: KEYS.products,
    mutationFn: productsService.postOneInsideStore,
  });

  const onSubmit = async (values: ProductSchema) => {
    await mutateAsync(values);
  };

  return (
    <FormDialog
      title='Add Product'
      defaultValues={{
        ownerId: auth?.currentUser?.uid,
        name: '',
        price: 0,
        description: '',
        availability: 'Available',
        category: '',
        // @ts-ignore
        storeId: storeId,
      }}
      schema={productSchema}
      onFormSubmit={onSubmit}
      submitText='Add'
      onClose={onClose}
      {...rest}
    >
      <BusinessOwnerProductModalForm />
    </FormDialog>
  );
};

export default AddOwnerProductModal;
