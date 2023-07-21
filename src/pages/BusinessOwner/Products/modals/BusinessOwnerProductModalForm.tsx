import { useEffect } from 'react';

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
      <TextFieldElement name='name' label='Product Name' required />
      <NumberFieldElement name='price' label='Price' required />
      <TextFieldElement name='description' label='Description' />
      <NumberFieldElement name='stock' label='Stock' fieldType='integer' />
      <SelectDropdownElement
        name='category'
        label='Category Name'
        valueKey='_id'
        labelKey='name'
        options={productCategories}
      />
      <SelectDropdownElement
        name='availability'
        label='Availability'
        labelKey='id'
        options={[{ id: 'Available' }, { id: 'Unavailable' }]}
        required
      />
      <TextFieldElement name='productId' label='Product ID' />
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
      <NumberFieldElement
        name='quantityPerUnit'
        label='Quantity per unit'
        fieldType='integer'
        required
      />
      <TextFieldElement name='batchNumber' label='Batch Number' required />
      <TextFieldElement name='productCode' label='Product Code' required />
    </>
  );
};

export default BusinessOwnerProductModalForm;
