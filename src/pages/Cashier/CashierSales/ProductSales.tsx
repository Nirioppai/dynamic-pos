import { FC, PropsWithChildren } from 'react';

interface StoreItemsGridProps {
  disableWrite?: boolean;
}

const ProductSales: FC<PropsWithChildren<StoreItemsGridProps>> = ({
  disableWrite,
}) => {
  console.log(disableWrite);
  return <>ProductSales</>;
};

export default ProductSales;
