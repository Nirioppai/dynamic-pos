import { FC, useEffect } from 'react';

import { useQueries } from 'react-query';

import { AddExistingCashierModal, AddOwnerCashierModal } from './modals';

import { DynamicAgGrid } from '~/components';
import { KEYS } from '~/constants';
import { cashiersService } from '~/services';

type StoreCashiersGridProps = {
  disableWrite?: boolean;
  storeId: string;
};

const StoreCashierGrid: FC<StoreCashiersGridProps> = ({
  disableWrite,
  storeId,
}) => {
  const queries = useQueries([
    {
      queryKey: KEYS.cashiers,
      queryFn: () => cashiersService.getCashiersInStore(storeId || ''),
    },
  ]);

  const cashiers = queries[0].data || [];

  // @ts-ignore
  const isLoading = queries.some((q) => q.isLoading);

  // @ts-ignore
  const isError = queries.some((q) => q.isError);

  useEffect(() => {
    queries.forEach((q) => q.refetch());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          addAnother: !disableWrite,
          edit: disableWrite,
          archive: disableWrite,
        }}
        addText='Add New Cashier'
        addAnotherText='Add From Existing Cashiers'
        // onArchive={async (row) => await archiveEntry(row._id)}
        AddModal={AddOwnerCashierModal}
        AddAnotherModal={AddExistingCashierModal}
        // EditModal={EditOwnerCashierModal}
      />
    </>
  );
};

export default StoreCashierGrid;
