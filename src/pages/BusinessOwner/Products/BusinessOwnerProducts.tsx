import { FC, PropsWithChildren } from 'react';

import ImportProducts from './ImportProducts';
import OwnerProductsGrid from './OwnerProductsGrid';

import { PageContentWrapper, TabWithContent } from '~/components';

const BusinessOwnerProducts: FC<
  PropsWithChildren<{ disableWrite?: boolean }>
> = ({ disableWrite }) => {
  return (
    <PageContentWrapper title='Products'>
      <TabWithContent
        tabItems={[
          {
            name: 'Overview',
            content: <OwnerProductsGrid disableWrite={disableWrite} />,
          },
          {
            name: 'Import',
            content: <ImportProducts />,
          },
        ]}
      />
    </PageContentWrapper>
  );
};

export default BusinessOwnerProducts;
