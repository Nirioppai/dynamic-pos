import { FC } from 'react';

import { Typography } from '@mui/material';

import { CsvDropzone } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { ProductSchema, productSchema } from '~/schemas';
import { categoriesService, productsService } from '~/services';
import { createHashMap, validateCsvRow } from '~/utils';

const ImportProducts: FC = () => {
  return (
    <CsvDropzone<ProductSchema>
      error={false}
      sampleFileName='Products Sample File'
      csvHeaders={[
        'name',
        'price',
        'description',
        'stock',
        'category',
        'availability',
      ]}
      queryKey={KEYS.products}
      uniqueColumns={['name']}
      unflattenObject
      nonStringAssignments={{
        price: parseFloat,
        stock: parseInt,
      }}
      //  @ts-ignore
      dynamicAssignments={async (content) => {
        const products = await productsService.getProducts(
          auth?.currentUser?.uid || ''
        );

        const categories = await categoriesService.getProductCategories(
          auth?.currentUser?.uid || ''
        );
        const categoriesMap = createHashMap(categories, 'name');
        const namesMap = createHashMap(products, 'name');

        console.log('categoriesMap: ');

        // ** This is to replace the modified content above
        const modifiedContent = content.map((row) => ({
          ...row,
          ownerId: auth?.currentUser?.uid,
          storeId: '',
        }));

        console.log(modifiedContent);

        // content validation moved here
        // this is to reduce the number of requests to the server
        const mergedContent = content.map((row, idx) => ({
          ...row,
          ...modifiedContent[idx],
        }));

        mergedContent.forEach((row, index) => {
          validateCsvRow({
            index,
            value: row.name,
            validationFn: (value: any) => !namesMap.has(value),
            errorText: 'Product with name already exists.',
          });
          validateCsvRow({
            index,
            value: row.category,
            validationFn: (value: any) => categoriesMap.has(value),
            errorText: 'Product Category does not exist.',
          });
        });

        return mergedContent;
      }}
      validationSchema={productSchema}
      mutationFn={productsService.postMany}
    >
      <details>
        <Typography component='summary'>Required fields:</Typography>
        <Typography component='ul'>
          <li>name</li>
          <li>price</li>
          <li>
            availability: &apos;Available&apos; or &apos;Unavailable&apos;
          </li>
        </Typography>
      </details>
    </CsvDropzone>
  );
};

export default ImportProducts;
