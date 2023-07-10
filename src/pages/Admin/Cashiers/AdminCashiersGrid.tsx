import { FC, PropsWithChildren } from 'react';

import { useQueries } from 'react-query';

// eslint-disable-next-line import/order

import { DynamicAgGrid } from '~/components';
import { KEYS } from '~/constants';
import { cashiersService } from '~/services';

const AdminCashiersGrid: FC<PropsWithChildren<{ disableWrite?: boolean }>> = ({
  disableWrite,
}) => {
  // @ts-ignore

  const queries = useQueries([
    {
      queryKey: KEYS.cashiers,
      queryFn: () => cashiersService.getAllCashiers(),
    },
  ]);

  const cashiers = queries[0].data || [];

  const isLoading = queries.some((q) => q.isLoading);
  // const isSuccess = queries.every((q) => q.isSuccess);
  const isError = queries.some((q) => q.isError);

  return (
    <>
      <DynamicAgGrid
        rowData={cashiers}
        columnDefs={[
          {
            field: 'name',
            headerName: 'Name',
            sort: 'asc',
            minWidth: 200,
            maxWidth: 300,
            cellStyle: { fontWeight: 500 },
            headerTooltip: 'Name',
          },
          {
            field: 'email',
            headerName: 'Email',
            minWidth: 200,
            headerTooltip: 'Email',
          },
          {
            field: 'password',
            headerName: 'Password',
            minWidth: 200,
            valueFormatter: (params) => '*'.repeat(params.value.length),
            headerTooltip:
              'Password is hidden for security reasons. Click on Edit to view.',
            tooltipValueGetter: () =>
              'Password is hidden for security reasons. Click on Edit to view.',
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

export default AdminCashiersGrid;
