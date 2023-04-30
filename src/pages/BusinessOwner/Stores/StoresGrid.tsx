import { FC, PropsWithChildren } from 'react';

import { useQueries } from 'react-query';

// eslint-disable-next-line import/order
import { AddStoreModal, EditStoreModal } from './modals';
import { DynamicAgGrid } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { useArchiveMutation } from '~/hooks';
import { storesService } from '~/services';

const StoresGrid: FC<PropsWithChildren<{ disableWrite?: boolean }>> = ({
  disableWrite,
}) => {
  // @ts-ignore

  const queries = useQueries([
    {
      queryKey: KEYS.storeInstances,
      queryFn: () => storesService.getStores(auth?.currentUser?.uid || ''),
    },
  ]);

  const stores = queries[0].data || [];

  const isLoading = queries.some((q) => q.isLoading);
  // const isSuccess = queries.every((q) => q.isSuccess);
  const isError = queries.some((q) => q.isError);

  // MUTATIONS

  const { mutateAsync: archiveEntry } = useArchiveMutation({
    queryKey: KEYS.storeInstances,
    mutationFn: storesService.archiveOne,
  });

  return (
    <>
      <DynamicAgGrid
        rowData={stores}
        columnDefs={[
          {
            field: 'name',
            headerName: 'Name',
            sort: 'asc',
            minWidth: 200,
            cellStyle: { fontWeight: 500 },
          },
          {
            field: 'address',
            headerName: 'Address',

            minWidth: 200,
          },
          {
            field: 'name',
            headerName: 'Products',
            valueGetter: ({ data }) => data?.products?.length || '0',
            minWidth: 100,
          },
          {
            field: 'name',
            headerName: 'Services',
            valueGetter: ({ data }) => data?.services?.length || '0',
            minWidth: 100,
          },
          {
            field: 'name',
            headerName: 'Categories',
            valueGetter: ({ data }) => data?.categories?.length || '0',
            minWidth: 100,
          },
          {
            field: 'name',
            headerName: 'Cashiers',
            valueGetter: ({ data }) => data?.cashiers?.length || '0',
            minWidth: 100,
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
        AddModal={AddStoreModal}
        EditModal={EditStoreModal}
      />
    </>
  );
};

export default StoresGrid;
