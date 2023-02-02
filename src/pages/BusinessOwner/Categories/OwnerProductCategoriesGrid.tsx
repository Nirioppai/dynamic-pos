import { FC, PropsWithChildren } from 'react';

import { useQueries } from 'react-query';

// eslint-disable-next-line import/order
import {
  AddOwnerProductCategoryModal,
  EditOwnerProductCategoryModal,
} from './modals';
import { DynamicAgGrid } from '~/components';
import { KEYS } from '~/constants';
import { useArchiveMutation } from '~/hooks';
import { categoriesService } from '~/services';

const OwnerProductCategoriesGrid: FC<
  PropsWithChildren<{ disableWrite?: boolean }>
> = ({ disableWrite }) => {
  // @ts-ignore

  const queries = useQueries([
    {
      queryKey: KEYS.productCategories,
      queryFn: () => categoriesService.getProductCategories(),
    },
  ]);

  const productCategories = queries[0].data || [];

  const isLoading = queries.some((q) => q.isLoading);
  // const isSuccess = queries.every((q) => q.isSuccess);
  const isError = queries.some((q) => q.isError);

  // MUTATIONS

  const { mutateAsync: archiveEntry } = useArchiveMutation({
    queryKey: KEYS.productCategories,
    mutationFn: categoriesService.archiveOneProductCategory,
  });

  return (
    <>
      <DynamicAgGrid
        rowData={productCategories}
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
        AddModal={AddOwnerProductCategoryModal}
        EditModal={EditOwnerProductCategoryModal}
      />
    </>
  );
};

export default OwnerProductCategoriesGrid;
