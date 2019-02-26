import React from 'react';

import AdminLogin from '../AdminLogin';
import ResetYourPassword from '../../components/admin-login/ResetYourPassword';

const ResetYourPasswordRoute = () => {
  return (
    <AdminLogin>
      <ResetYourPassword />
    </AdminLogin>
  );
};

export default ResetYourPasswordRoute;
