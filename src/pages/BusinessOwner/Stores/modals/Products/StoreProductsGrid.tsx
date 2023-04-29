import { FC } from 'react';

import { useQueries } from 'react-query';

import { DynamicAgGrid } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { productsService } from '~/services';

type StoreProductsGridProps = {
  disableWrite?: boolean;
  storeId: string;
};

const StoreProductsGrid: FC<StoreProductsGridProps> = ({
  disableWrite,
  storeId,
}) => {
  const queries = useQueries([
    {
      queryKey: KEYS.storeInstances,
      queryFn: () => productsService.getProductsInsideStore(storeId),
    },
    {
      queryKey: KEYS.products,
      queryFn: () => productsService.getProducts(auth?.currentUser?.uid || ''),
    },
  ]);

  const storeProducts = queries[0].data || [];
  const products = queries[1].data || [];

  console.log('products: ', products);
  // @ts-ignore
  const productIds = [];
  storeProducts.map((product: any) => {
    productIds.push(product.products);
  });

  const filteredProducts = products.filter((product: any) => {
    const id = product._id;
    // @ts-ignore
    return productIds[0].includes(id);
  });

  console.log(filteredProducts);

  const isLoading = queries.some((q) => q.isLoading);
  // const isSuccess = queries.every((q) => q.isSuccess);
  const isError = queries.some((q) => q.isError);

  return (
    <>
      {' '}
      <DynamicAgGrid
        rowData={filteredProducts}
        columnDefs={[
          {
            field: 'name',
            headerName: 'Name',
            sort: 'asc',
            minWidth: 200,
            cellStyle: { fontWeight: 500 },
          },
          {
            field: '_id',
            headerName: 'ID',

            minWidth: 250,
          },
          {
            field: 'price',
            headerName: 'Price',

            minWidth: 250,
          },
        ]}
        isLoading={isLoading}
        isError={isError}
        actions={{
          add: disableWrite,
          edit: disableWrite,
          archive: disableWrite,
        }}
        // onArchive={async (row) => await archiveEntry(row._id)}
        // AddModal={AddOwnerProductModal}
        // EditModal={EditOwnerProductModal}
      />
    </>
  );
};

export default StoreProductsGrid;
