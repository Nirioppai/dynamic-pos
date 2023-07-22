import { useEffect } from 'react';

import Grid from '@mui/material/Grid';
import { TextFieldElement } from 'react-hook-form-mui';
import { useQueries } from 'react-query';

import { NumberFieldElement, SelectDropdownElement } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { categoriesService } from '~/services';
const BusinessOwnerProductModalForm = () => {
  const queries = useQueries([
    {
      queryKey: KEYS.productCategories,
      queryFn: () =>
        categoriesService.getProductCategories(auth?.currentUser?.uid || ''),
    },
  ]);

  const productCategories = queries[0].data || [];

  useEffect(() => {
    queries.forEach((q) => q.refetch());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextFieldElement name='name' label='Product Name' required />
        </Grid>
        <Grid item xs={12}>
          <TextFieldElement name='description' label='Description' />
        </Grid>
        <Grid item xs={4}>
          <NumberFieldElement name='price' label='Price' required />
        </Grid>
        <Grid item xs={4}>
          <NumberFieldElement name='stock' label='Stock' fieldType='integer' />
        </Grid>
        <Grid item xs={4}>
          <SelectDropdownElement
            name='availability'
            label='Availability'
            labelKey='id'
            options={[{ id: 'Available' }, { id: 'Unavailable' }]}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <SelectDropdownElement
            name='category'
            label='Category Name'
            valueKey='_id'
            labelKey='name'
            options={productCategories}
          />
        </Grid>
        <Grid item xs={4}>
          <TextFieldElement name='productId' label='Product ID' />
        </Grid>
        <Grid item xs={4}>
          <TextFieldElement name='batchNumber' label='Batch Number' required />
        </Grid>
        <Grid item xs={4}>
          <TextFieldElement name='productCode' label='Product Code' required />
        </Grid>
        <Grid item xs={4}>
          <NumberFieldElement
            name='quantityPerUnit'
            label='Quantity per unit'
            fieldType='integer'
            required
          />
        </Grid>
        <Grid item xs={4}>
          <SelectDropdownElement
            name='unit'
            label='Unit'
            labelKey='id'
            options={[
              { id: 'g' },
              { id: 'Pcs' },
              { id: 'kg' },
              { id: 'L' },
              { id: 'mL' },
            ]}
            required
          />
        </Grid>
        {/* <Grid item xs={6}>
          <TextFieldElement name='key' label='Key Name' />
        </Grid>
        <Grid item xs={4}>
          <TextFieldElement name='value' label='Value Name' />
        </Grid>
        <Grid item xs={2}>
      
        </Grid> */}
      </Grid>
    </>
  );
};

export default BusinessOwnerProductModalForm;
