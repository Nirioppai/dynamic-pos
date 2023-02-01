import { Navigate, Route, Routes } from 'react-router-dom';

import { USER_TYPES } from '~/constants';
import {
  // ForgotPassword,
  Login,
  LoginSelect,
  // NotFound,
  // ResetPassword,
} from '~/pages';
import { BusinessOwnerRoutes } from '~/routes';
function AppRoutes() {
  return (
    <>
      <Routes>
        {/* AUTH */}
        <Route path='/' element={<LoginSelect />} />
        <Route path='/login' element={<Navigate replace to='/' />} />
        {USER_TYPES.map((userType) => (
          <Route
            key={userType.value}
            path={`/login/${userType.value}`}
            element={<Login userType={userType} />}
          />
        ))}
        {/* USER TYPES */}
        <Route path='/businessOwner/*' element={<BusinessOwnerRoutes />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
