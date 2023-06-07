import { FC, PropsWithChildren, useEffect } from 'react';

import { Button, Grid } from '@mui/material';
import { useQueries } from 'react-query';

// eslint-disable-next-line import/order

import { DynamicAgGrid } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { cashiersService, productsService } from '~/services';

const StoreItemsGrid: FC<PropsWithChildren<{ disableWrite?: boolean }>> = ({
  disableWrite,
}) => {
  const queries = useQueries([
    {
      queryKey: KEYS.products,
      queryFn: () => productsService.getProducts(auth?.currentUser?.uid || ''),
    },
    {
      queryKey: KEYS.cashiers,
      queryFn: () => cashiersService.getLoggedInCashier(),
    },
  ]);

  console.log(auth.currentUser?.uid);

  const products = queries[0].data || [];
  const cashier = queries[1].data || [];

  console.log(cashier);

  const isLoading = queries.some((q) => q.isLoading);
  // const isSuccess = queries.every((q) => q.isSuccess);
  const isError = queries.some((q) => q.isError);

  useEffect(() => {
    queries.forEach((q) => q.refetch());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          CART
        </Grid>
        <Grid container item xs={6} justifyContent='flex-end'>
          <Grid>ADD CUSTOMER</Grid>
          <Grid>CLEAR CART</Grid>
        </Grid>
      </Grid>
      <Button variant='contained' fullWidth sx={{ mb: '15px' }}>
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
