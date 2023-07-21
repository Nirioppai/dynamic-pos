import { FC, PropsWithChildren } from 'react';

import { useQueries } from 'react-query';

import StoresGrid from './StoresGrid';

import { PageContentWrapper } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { BusinessDetails } from '~/pages';
import { storesService } from '~/services';

const BusinessOwnerStores: FC<
  PropsWithChildren<{ disableWrite?: boolean }>
> = ({ disableWrite }) => {
  const queries = useQueries([
    {
      queryKey: KEYS.storeInstances,
      queryFn: () => storesService.getStores(auth?.currentUser?.uid || ''),
    },
  ]);

  const stores = queries[0].data || [];

  console.log(stores.length);

  console.log(stores);

  const isLoading = queries.some((q) => q.isLoading);

  if (!isLoading && stores.length !== 0) {
    return (
      <PageContentWrapper title='Stores'>
        <StoresGrid disableWrite={disableWrite} />
      </PageContentWrapper>
    );
  } else {
    return <BusinessDetails />;
  }
};

export default BusinessOwnerStores;
