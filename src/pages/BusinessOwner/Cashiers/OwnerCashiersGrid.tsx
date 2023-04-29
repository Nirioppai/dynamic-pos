import { FC, PropsWithChildren } from 'react';

import { useQueries } from 'react-query';

// eslint-disable-next-line import/order
import { AddOwnerCashierModal, EditOwnerCashierModal } from './modals';
import { DynamicAgGrid } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { useArchiveMutation } from '~/hooks';
import { cashiersService } from '~/services';

const OwnerCashiersGrid: FC<PropsWithChildren<{ disableWrite?: boolean }>> = ({
  disableWrite,
}) => {
  // @ts-ignore

  const queries = useQueries([
    {
      queryKey: KEYS.cashiers,
      queryFn: () => cashiersService.getCashiers(auth?.currentUser?.uid || ''),
    },
  ]);

  const cashiers = queries[0].data || [];

  const isLoading = queries.some((q) => q.isLoading);
  // const isSuccess = queries.every((q) => q.isSuccess);
  const isError = queries.some((q) => q.isError);

  // MUTATIONS

  const { mutateAsync: archiveEntry } = useArchiveMutation({
    queryKey: KEYS.cashiers,
    mutationFn: cashiersService.archiveOne,
  });

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
            cellStyle: { fontWeight: 500 },
          },
        ]}
        isLoading={isLoading}
        isError={isError}
        actions={{
          add: !disableWrite,
          edit: !disableWrite,
          archive: !disableWrite,
        }}
        onArchive={async (row) => await archiveEntry(row._id)}
        AddModal={AddOwnerCashierModal}
        EditModal={EditOwnerCashierModal}
      />
    </>
  );
};

export default OwnerCashiersGrid;