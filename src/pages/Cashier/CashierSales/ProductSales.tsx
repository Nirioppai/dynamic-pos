import { FC, PropsWithChildren } from 'react';

import { useQueries } from 'react-query';
import { getRecoil } from 'recoil-nexus';

import { DynamicAgGrid } from '~/components';
import { cashierSelectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { productsService } from '~/services';

interface ProductSalesItemsGridProps {
  disableWrite?: boolean;
}

const ProductSales: FC<PropsWithChildren<ProductSalesItemsGridProps>> = ({
  disableWrite,
}) => {
  const storeId = getRecoil(cashierSelectedStore);

  const queries = useQueries(
    // @ts-ignore
    storeId
      ? [
          {
            queryKey: [KEYS.products, storeId],
            queryFn: () => productsService.getProductsInStore(storeId),
          },
        ]
      : []
  );

  // @ts-ignore
  const products = queries[0]?.data || [];

  // @ts-ignore
  const isLoading = queries.some((q) => q.isLoading);
  // @ts-ignore
  const isError = queries.some((q) => q.isError);

  console.log(disableWrite);
  return (
    <>
      <DynamicAgGrid
        searchBarWidth={'100%'}
        rowData={products}
        columnDefs={[
          {
            field: 'name',
            headerName: 'Name',
            sort: 'asc',
            minWidth: 200,
            cellStyle: { fontWeight: 500 },
          },
          {
            field: 'price',
            headerName: 'Price',

            minWidth: 100,
          },

          {
            field: 'description',
            headerName: 'Description',

            minWidth: 250,
          },
          {
            field: 'availability',
            headerName: 'Availability',

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
      />
    </>
  );
};

export default ProductSales;
