import { FC, PropsWithChildren } from 'react';

import { useQueries } from 'react-query';

import ImportServices from './ImportServices';
import OwnerServicesGrid from './OwnerServicesGrid';

import { PageContentWrapper, TabWithContent } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { BusinessDetails } from '~/pages';
import { usersService } from '~/services';

const BusinessOwnerServices: FC<
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

  if (!isLoading && stores[0].status === 'Pending') {
    return (
      <PageContentWrapper title='Services'>
        <TabWithContent
          tabItems={[
            {
              name: 'Overview',
              content: <OwnerServicesGrid disableWrite={disableWrite} />,
            },
            {
              name: 'Import',
              content: <ImportServices />,
            },
          ]}
        />
      </PageContentWrapper>
    );
  } else {
    return <BusinessDetails />;
  }
};

export default BusinessOwnerServices;
