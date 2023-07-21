import { FC, PropsWithChildren } from 'react';

import { useQueries } from 'react-query';

import ImportProducts from './ImportProducts';
import OwnerProductsGrid from './OwnerProductsGrid';

import { PageContentWrapper, TabWithContent } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { BusinessDetails } from '~/pages';
import { usersService } from '~/services';

const BusinessOwnerProducts: FC<
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
      <PageContentWrapper title='Products'>
        <TabWithContent
          tabItems={[
            {
              name: 'Overview',
              content: <OwnerProductsGrid disableWrite={disableWrite} />,
            },
            {
              name: 'Import',
              content: <ImportProducts />,
            },
          ]}
        />
      </PageContentWrapper>
    );
  } else {
    return <BusinessDetails />;
  }
};

export default BusinessOwnerProducts;
