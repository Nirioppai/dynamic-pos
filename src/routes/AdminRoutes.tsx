import { Navigate, Route, Routes } from 'react-router-dom';

import { NotFound } from '~/pages';
import { ProtectedRoute } from '~/routes';

const AdminRoutes = () => (
  <Routes>
    <Route element={<ProtectedRoute />}>
      <Route path='' element={<Navigate replace to='/admin/pageone' />} />
      {/* <Route path='equipments' element={<Equipments />} /> */}

      <Route
        path='*'
        element={<NotFound link='/admin' height='calc(100vh - 112px)' />}
      />
    </Route>
  </Routes>
);

export default AdminRoutes;
