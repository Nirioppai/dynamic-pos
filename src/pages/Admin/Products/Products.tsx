import { FC, PropsWithChildren } from 'react';

import AdminProductsGrid from './AdminProductsGrid';

import {
  PageContentWrapper,
  // TabWithContent
} from '~/components';

const AdminProducts: FC<PropsWithChildren<{ disableWrite?: boolean }>> = ({
  disableWrite,
}) => {
  return (
    <PageContentWrapper title='Products'>
      <AdminProductsGrid disableWrite={disableWrite} />
    </PageContentWrapper>
  );
};

export default AdminProducts;
