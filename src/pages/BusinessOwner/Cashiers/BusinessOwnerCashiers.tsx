import { FC, PropsWithChildren } from 'react';

import { useQueries } from 'react-query';

import OwnerCashiersGrid from './OwnerCashiersGrid';

import { PageContentWrapper } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { BusinessDetails } from '~/pages';
import { usersService } from '~/services';

const BusinessOwnerCashiers: FC<
  PropsWithChildren<{ disableWrite?: boolean }>
> = ({ disableWrite }) => {
  const queries = useQueries([
    {
      queryKey: KEYS.users,
      queryFn: () => usersService.getUser(auth?.currentUser?.uid || ''),
    },
  ]);

  const users = queries[0].data || [];

  const isLoading = queries.some((q) => q.isLoading);

  if (!isLoading && users[0].status !== false) {
    return (
      <PageContentWrapper title='Cashiers'>
        <OwnerCashiersGrid disableWrite={disableWrite} />
      </PageContentWrapper>
    );
  } else {
    return <BusinessDetails />;
  }
};

export default BusinessOwnerCashiers;
