import { Navigate, Route, Routes } from 'react-router-dom';

import { AdminStores, NotFound } from '~/pages';
import { ProtectedRoute } from '~/routes';

const SystemAdministratorRoutes = () => (
  <Routes>
    <Route element={<ProtectedRoute userType='systemAdministrator' />}>
      <Route
        path=''
        element={<Navigate replace to='/systemAdministrator/stores' />}
      />
      <Route path='/stores' element={<AdminStores />} />

      <Route
        path='*'
        element={
          <NotFound link='/systemAdministrator' height='calc(100vh - 112px)' />
        }
      />
    </Route>
  </Routes>
);

export default SystemAdministratorRoutes;
