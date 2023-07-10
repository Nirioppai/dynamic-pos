import { FC, PropsWithChildren } from 'react';

import AdminStoresGrid from './AdminStoresGrid';

import {
  PageContentWrapper,
  // TabWithContent
} from '~/components';

const AdminStores: FC<PropsWithChildren<{ disableWrite?: boolean }>> = ({
  disableWrite,
}) => {
  return (
    <PageContentWrapper title='Stores'>
      <AdminStoresGrid disableWrite={disableWrite} />
    </PageContentWrapper>
  );
};

export default AdminStores;
