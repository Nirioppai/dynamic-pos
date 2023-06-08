import { FC, PropsWithChildren, useState } from 'react';

import { Button, Grid } from '@mui/material';
import { useQueries } from 'react-query';
import { getRecoil } from 'recoil-nexus';

import CartDialog from './CartDialog';
import ClearCartDialog from './ClearCartDialog';

import { DynamicAgGrid } from '~/components';
import { cashierSelectedStore } from '~/configs';
import { KEYS } from '~/constants';
import { productsService } from '~/services';
interface StoreItemsGridProps {
  disableWrite?: boolean;
}

const StoreItemsGrid: FC<PropsWithChildren<StoreItemsGridProps>> = ({
  disableWrite,
}) => {
  const storeId = getRecoil(cashierSelectedStore);
  const [selectedItems, setSelectedItems] = useState([]);

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

  const handleRowClick = (event: any) => {
    //  @ts-ignore
    setSelectedItems((prevProducts) => [...prevProducts, event]);
  };

  const handleClearCart = () => {
    setSelectedItems([]);
  };

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <CartDialog selectedItems={selectedItems} />
        </Grid>
        <Grid container item xs={6} justifyContent='flex-end'>
          <Grid>ADD CUSTOMER</Grid>
          <Grid>
            <ClearCartDialog
              selectedItems={selectedItems}
              onClearCart={handleClearCart}
            />
          </Grid>
        </Grid>
      </Grid>
      <Button variant='contained' fullWidth sx={{ mb: '15px', mt: '15px' }}>
        Charge Transaction
        <br />
        0.00
      </Button>
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
          {
            headerName: '',
            field: 'actions',
            sortable: false,
            filter: false,
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
              onClick: handleRowClick,
              label: 'Click me',
            },
            minWidth: 83,
            maxWidth: 83,
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

export default StoreItemsGrid;
