import { FC, PropsWithChildren } from 'react';

import AdminCashiersGrid from './AdminCashiersGrid';

import {
  PageContentWrapper,
  // TabWithContent
} from '~/components';

const AdminCashiers: FC<PropsWithChildren<{ disableWrite?: boolean }>> = ({
  disableWrite,
}) => {
  return (
    <PageContentWrapper title='Cashiers'>
      <AdminCashiersGrid disableWrite={disableWrite} />
    </PageContentWrapper>
  );
};

export default AdminCashiers;
