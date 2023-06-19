import { FC, PropsWithChildren } from 'react';

interface StoreItemsGridProps {
  disableWrite?: boolean;
}

const ServiceSales: FC<PropsWithChildren<StoreItemsGridProps>> = ({
  disableWrite,
}) => {
  console.log(disableWrite);
  return <>ServiceSales</>;
};

export default ServiceSales;
