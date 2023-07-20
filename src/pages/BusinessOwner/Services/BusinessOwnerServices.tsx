import { FC, PropsWithChildren } from 'react';

import ImportServices from './ImportServices';
import OwnerServicesGrid from './OwnerServicesGrid';

import { PageContentWrapper, TabWithContent } from '~/components';

const BusinessOwnerServices: FC<
  PropsWithChildren<{ disableWrite?: boolean }>
> = ({ disableWrite }) => {
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
};

export default BusinessOwnerServices;
