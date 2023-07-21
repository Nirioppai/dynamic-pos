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
    <PageContentWrapper title='Business Approvals'>
      <AdminStoresGrid disableWrite={disableWrite} />
    </PageContentWrapper>
  );
};

export default AdminStores;
