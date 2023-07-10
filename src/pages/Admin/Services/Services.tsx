import { FC, PropsWithChildren } from 'react';

import AdminServicesGrid from './AdminServicesGrid';

import {
  PageContentWrapper,
  // TabWithContent
} from '~/components';

const AdminServices: FC<PropsWithChildren<{ disableWrite?: boolean }>> = ({
  disableWrite,
}) => {
  return (
    <PageContentWrapper title='Services'>
      <AdminServicesGrid disableWrite={disableWrite} />
    </PageContentWrapper>
  );
};

export default AdminServices;
