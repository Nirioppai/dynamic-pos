import { FC, PropsWithChildren } from 'react';

import { useQueries } from 'react-query';

import StoresGrid from './StoresGrid';

import { PageContentWrapper } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { BusinessDetails } from '~/pages';
import { usersService } from '~/services';

const BusinessOwnerStores: FC<
  PropsWithChildren<{ disableWrite?: boolean }>
> = ({ disableWrite }) => {
  const queries = useQueries([
    {
      queryKey: KEYS.users,
      queryFn: () => usersService.getUser(auth?.currentUser?.uid || ''),
    },
  ]);

  const stores = queries[0].data || [];

  const isLoading = queries.some((q) => q.isLoading);

  if (!isLoading && stores[0].status !== 'Pending') {
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
