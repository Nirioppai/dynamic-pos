import { FC, PropsWithChildren } from 'react';

import StoreItemsGrid from './StoreItemsGrid';
// import EquipmentImport from './EquipmentImport';

import {
  PageContentWrapper,
  // TabWithContent
} from '~/components';

const CashierStore: FC<PropsWithChildren<{ disableWrite?: boolean }>> = ({
  disableWrite,
}) => {
  return (
    <PageContentWrapper title='Store Sales'>
      <StoreItemsGrid disableWrite={disableWrite} />
    </PageContentWrapper>
  );
};

export default CashierStore;
