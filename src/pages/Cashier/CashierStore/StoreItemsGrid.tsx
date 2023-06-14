import { FC, PropsWithChildren, useState } from 'react';

import { Button, Grid } from '@mui/material';

import CartDialog from './CartDialog';
import ClearCartDialog from './ClearCartDialog';
import ProductsList from './Tabs/ProductsList';
import ServicesList from './Tabs/ServicesList';

import { TabWithContent } from '~/components';

interface StoreItemsGridProps {
  disableWrite?: boolean;
}

const StoreItemsGrid: FC<PropsWithChildren<StoreItemsGridProps>> = ({
  disableWrite,
}) => {
  const [selectedItems, setSelectedItems] = useState({
    products: [],
    services: [],
  });

  const handleProductClick = (event: any) => {
    // @ts-ignore
    setSelectedItems((prevState) => {
      return { ...prevState, products: [...prevState.products, event] };
    });
  };

  const handleServiceClick = (event: any) => {
    // @ts-ignore
    setSelectedItems((prevState) => {
      return { ...prevState, services: [...prevState.services, event] };
    });
  };

  const handleClearCart = () => {
    setSelectedItems({ products: [], services: [] });
  };

  console.log('selectedItems: ', selectedItems);

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

      <TabWithContent
        tabItems={[
          {
            name: 'Products',
            content: (
              <ProductsList
                disableWrite={disableWrite}
                handleProductClick={handleProductClick}
              />
            ),
          },
          {
            name: 'Services',
            content: (
              <ServicesList
                disableWrite={disableWrite}
                handleServiceClick={handleServiceClick}
              />
            ),
          },
        ]}
      />
    </>
  );
};

export default StoreItemsGrid;
