import { Navigate, Route, Routes } from 'react-router-dom';

import { USER_TYPES } from '~/constants';
import {
  // ForgotPassword,
  Login,
  LoginSelect,
  // NotFound,
  // ResetPassword,
} from '~/pages';
function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginSelect />} />
        <Route path='/login' element={<Navigate replace to='/' />} />
        {USER_TYPES.map((userType) => (
          <Route
            key={userType.value}
            path={`/login/${userType.value}`}
            element={<Login userType={userType} />}
          />
        ))}
      </Routes>
    </>
  );
}

export default AppRoutes;
