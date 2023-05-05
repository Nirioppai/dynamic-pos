import { FC, useEffect } from 'react';

import { useQueries } from 'react-query';

import { AddOwnerServiceModal } from './modals';

import { DynamicAgGrid } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { servicesService, storesService } from '~/services';

type StoreServicesGridProps = {
  disableWrite?: boolean;
  storeId: string;
};

const StoreServicesGrid: FC<StoreServicesGridProps> = ({
  disableWrite,
  storeId,
}) => {
  const queries = useQueries([
    {
      queryKey: KEYS.storeInstances,
      queryFn: () => storesService.getEntitiesInsideStore(storeId),
    },
    {
      queryKey: KEYS.services,
      queryFn: () => servicesService.getServices(auth?.currentUser?.uid || ''),
    },
  ]);

  const storeServices = queries[0].data || [];
  const services = queries[1].data || [];

  const serviceIdsFilter = services.map((item: any) => item._id);

  const updatedStoreServices = storeServices.map((storeService: any) => {
    return {
      ...storeService,
      services: serviceIdsFilter,
    };
  });

  console.log('storeServices', storeServices);
  console.log('services', services);

  // @ts-ignore
  const serviceIds = updatedStoreServices.map(
    (service: any) => service.services
  );

  const filteredServices = services.filter((service: any) => {
    const id = service._id;
    return serviceIds[0].includes(id);
  });

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
      {' '}
      <DynamicAgGrid
        rowData={filteredServices}
        columnDefs={[
          {
            field: 'name',
            headerName: 'Name',
            sort: 'asc',
            minWidth: 200,
            cellStyle: { fontWeight: 500 },
          },
          {
            field: '_id',
            headerName: 'ID',

            minWidth: 250,
          },
          {
            field: 'price',
            headerName: 'Price',

            minWidth: 250,
          },
        ]}
        isLoading={isLoading}
        isError={isError}
        actions={{
          add: !disableWrite,
          edit: disableWrite,
          archive: disableWrite,
        }}
        // onArchive={async (row) => await archiveEntry(row._id)}
        AddModal={AddOwnerServiceModal}
        // EditModal={EditOwnerServiceModal}
      />
    </>
  );
};

export default StoreServicesGrid;
