import { FC, useEffect, useMemo, useState } from 'react';

import { useQueries } from 'react-query';

import { AddOwnerProductModal } from './modals';

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
  console.log('current Store ID: ', storeId);

  const queries = useQueries([
    {
      queryKey: KEYS.products,
      queryFn: () => productsService.getProducts(auth?.currentUser?.uid || ''),
    },
  ]);

  const products = useMemo(() => queries[0].data || [], [queries]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // @ts-ignore
      const filteredProducts = products.filter((product) => {
        return (
          product.storesAssigned && product.storesAssigned.includes(storeId)
        );
      });
      setFilteredProducts(filteredProducts);
    };

    fetchData();
  }, [products, storeId]);

  // console.log(tryData);

  // @ts-ignore
  // const storeIds = storeProducts.map((product: any) => product.products);

  // const filteredProducts = products.filter((product: any) => {
  //   const id = product._id;
  //   return storeIds[0].includes(id);
  // });

  console.log('products', products);

  console.log('filteredProducts: ', filteredProducts);

  // @ts-ignore
  const isLoading = queries.some((q) => q.isLoading);

  // @ts-ignore
  const isError = queries.some((q) => q.isError);

  return (
    <>
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
          add: !disableWrite,
          edit: disableWrite,
          archive: disableWrite,
        }}
        // onArchive={async (row) => await archiveEntry(row._id)}
        AddModal={AddOwnerProductModal}
        // EditModal={EditOwnerProductModal}
      />
    </>
  );
};

export default StoreProductsGrid;
