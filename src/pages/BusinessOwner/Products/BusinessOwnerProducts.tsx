import { FC, PropsWithChildren } from 'react';

import OwnerProductsGrid from './OwnerProductsGrid';
// import EquipmentImport from './EquipmentImport';

import {
  PageContentWrapper,
  // TabWithContent
} from '~/components';

const BusinessOwnerProducts: FC<
  PropsWithChildren<{ disableWrite?: boolean }>
> = ({ disableWrite }) => {
  return (
    <PageContentWrapper title='Products'>
      {/* <TabWithContent
        tabItems={[
          {
            name: 'Overview',
            content: <OwnerProductsGrid disableWrite={disableWrite} />,
          },
        ]}
      /> */}
      <OwnerProductsGrid disableWrite={disableWrite} />
    </PageContentWrapper>
  );
};

export default BusinessOwnerProducts;
