import { FC, PropsWithChildren } from 'react';

import PendingStores from './PendingStores';
import StoresList from './StoresList';

import { TabWithContent } from '~/components';

const AdminStoresGrid: FC<PropsWithChildren<{ disableWrite?: boolean }>> = ({
  disableWrite,
}) => {
  // @ts-ignore

  return (
    <>
      <TabWithContent
        tabItems={[
          {
            name: 'Approvals',
            content: <PendingStores disableWrite={disableWrite} />,
          },
          {
            name: 'List',
            content: <StoresList disableWrite={disableWrite} />,
          },
        ]}
      />
    </>
  );
};

export default AdminStoresGrid;
