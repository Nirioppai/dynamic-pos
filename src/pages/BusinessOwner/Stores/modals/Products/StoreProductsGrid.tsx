import { FC, useEffect, useState } from 'react';

import { AddOwnerProductModal } from './modals';

import { DynamicAgGrid } from '~/components';
import { productsService } from '~/services';

type StoreProductsGridProps = {
  disableWrite?: boolean;
  storeId: string;
};

const StoreProductsGrid: FC<StoreProductsGridProps> = ({
  disableWrite,
  storeId,
}) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentProducts = await productsService.getProductsInStore(
        storeId || ''
      );

      setFilteredProducts(currentProducts);
    };

    fetchData();
  }, [storeId]);

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
