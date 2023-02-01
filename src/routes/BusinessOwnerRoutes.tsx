import { Navigate, Route, Routes } from 'react-router-dom';

import { BusinessOwnerStores, NotFound } from '~/pages';
import { ProtectedRoute } from '~/routes';

const BusinessOwnerRoutes = () => (
  <Routes>
    <Route element={<ProtectedRoute userType='businessOwner' />}>
      <Route
        path=''
        element={<Navigate replace to='/businessOwner/stores' />}
      />
      <Route path='/stores' element={<BusinessOwnerStores />} />

      <Route
        path='*'
        element={
          <NotFound link='/businessOwner' height='calc(100vh - 112px)' />
        }
      />
    </Route>
  </Routes>
);

export default BusinessOwnerRoutes;
