import { FC, PropsWithChildren } from 'react';

interface StoreItemsGridProps {
  disableWrite?: boolean;
}

const AllSales: FC<PropsWithChildren<StoreItemsGridProps>> = ({
  disableWrite,
}) => {
  console.log(disableWrite);
  return <>AllSales</>;
};

export default AllSales;
