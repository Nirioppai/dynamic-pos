import { FC, PropsWithChildren } from 'react';

// import { Grid } from '@mui/material';

import { getRecoil } from 'recoil-nexus';

import AllSales from './AllSales';
import ProductSales from './ProductSales';
import ServiceSales from './ServiceSales';

import { TabWithContent } from '~/components';
import { cashierSelectedStore } from '~/configs';

interface StoreItemsGridProps {
  disableWrite?: boolean;
}

const SaleItemsGrid: FC<PropsWithChildren<StoreItemsGridProps>> = ({
  disableWrite,
}) => {
  const storeId = getRecoil(cashierSelectedStore);

  return (
    <>
      <TabWithContent
        tabItems={[
          {
            name: 'All',
            content: <AllSales storeId={storeId} disableWrite={disableWrite} />,
          },
          {
            name: 'Products',
            content: (
              <ProductSales storeId={storeId} disableWrite={disableWrite} />
            ),
          },
          {
            name: 'Services',
            content: (
              <ServiceSales storeId={storeId} disableWrite={disableWrite} />
            ),
          },
        ]}
      />
    </>
  );
};

export default SaleItemsGrid;
