import { FC, PropsWithChildren, useEffect } from 'react';

import { useQueries } from 'react-query';

import ViewStoreModal from './ViewStoreModal';

import { DynamicAgGrid } from '~/components';
// eslint-disable-next-line import/order
import { KEYS } from '~/constants';
import { storesService } from '~/services';

const AdminStoresGrid: FC<PropsWithChildren<{ disableWrite?: boolean }>> = ({
  disableWrite,
}) => {
  // @ts-ignore

  const queries = useQueries([
    {
      queryKey: [KEYS.storeInstances, 'Pending'],
      queryFn: () => storesService.getAllPendingStores(),
    },
  ]);

  const pendingStores = queries[0].data || [];

  const isLoading = queries.some((q) => q.isLoading);
  // const isSuccess = queries.every((q) => q.isSuccess);
  const isError = queries.some((q) => q.isError);

  useEffect(() => {
    queries.forEach((q) => q.refetch());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DynamicAgGrid
        rowData={pendingStores}
        columnDefs={[
          {
            field: 'businessName',
            headerName: 'Business Name',
            sort: 'asc',
            headerTooltip: 'Business Name',
            minWidth: 200,
            cellStyle: { fontWeight: 500 },
          },

          {
            field: 'businessAddress',
            headerName: 'Address',
            headerTooltip: 'Address',
            minWidth: 250,
          },
        ]}
        isLoading={isLoading}
        isError={isError}
        actions={{
          add: disableWrite,
          edit: disableWrite,
          archive: disableWrite,
          export: disableWrite,
          view: !disableWrite,
        }}
        ViewModal={ViewStoreModal}
      />
    </>
  );
};

export default AdminStoresGrid;
