import { FC, PropsWithChildren } from 'react';

import { useQueries } from 'react-query';

import ImportProductCategories from './ImportProductCategories';
import OwnerProductCategoriesGrid from './OwnerProductCategoriesGrid';

import { PageContentWrapper, TabWithContent } from '~/components';
import { auth } from '~/configs';
import { KEYS } from '~/constants';
import { BusinessDetails } from '~/pages';
import { usersService } from '~/services';

const BusinessOwnerCategorys: FC<
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

  if (!isLoading && users[0].status !== 'Pending') {
    return (
      <PageContentWrapper title='Categories'>
        <TabWithContent
          tabItems={[
            {
              name: 'Product Categories Overview',
              content: (
                <OwnerProductCategoriesGrid disableWrite={disableWrite} />
              ),
            },
            {
              name: 'Product Categories Import',
              content: <ImportProductCategories />,
            },
          ]}
        />
      </PageContentWrapper>
    );
  } else {
    return <BusinessDetails />;
  }
};

export default BusinessOwnerCategorys;
