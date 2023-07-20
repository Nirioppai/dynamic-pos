import { FC, PropsWithChildren } from 'react';

import ImportProductCategories from './ImportProductCategories';
import OwnerProductCategoriesGrid from './OwnerProductCategoriesGrid';

import { PageContentWrapper, TabWithContent } from '~/components';

const BusinessOwnerCategorys: FC<
  PropsWithChildren<{ disableWrite?: boolean }>
> = ({ disableWrite }) => {
  return (
    <PageContentWrapper title='Categories'>
      <TabWithContent
        tabItems={[
          {
            name: 'Product Categories Overview',
            content: <OwnerProductCategoriesGrid disableWrite={disableWrite} />,
          },
          {
            name: 'Product Categories Import',
            content: <ImportProductCategories />,
          },
        ]}
      />
    </PageContentWrapper>
  );
};

export default BusinessOwnerCategorys;
