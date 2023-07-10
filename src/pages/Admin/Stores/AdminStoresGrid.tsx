import { FC, PropsWithChildren } from 'react';

import { useQueries } from 'react-query';

// eslint-disable-next-line import/order

import { DynamicAgGrid } from '~/components';
import { KEYS } from '~/constants';
import { storesService } from '~/services';

const AdminStoresGrid: FC<PropsWithChildren<{ disableWrite?: boolean }>> = ({
  disableWrite,
}) => {
  // @ts-ignore

  const queries = useQueries([
    {
      queryKey: KEYS.storeInstances,
      queryFn: () => storesService.getAllStores(),
    },
  ]);

  const stores = queries[0].data || [];

  const isLoading = queries.some((q) => q.isLoading);
  // const isSuccess = queries.every((q) => q.isSuccess);
  const isError = queries.some((q) => q.isError);

  return (
    <>
      <DynamicAgGrid
        rowData={stores}
        columnDefs={[
          {
            field: 'name',
            headerName: 'Name',
            sort: 'asc',
            headerTooltip: 'Name',
            minWidth: 200,
            cellStyle: { fontWeight: 500 },
          },

          {
            field: 'address',
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
        }}
      />
    </>
  );
};

export default AdminStoresGrid;
