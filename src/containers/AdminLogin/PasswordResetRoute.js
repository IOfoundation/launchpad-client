import React from 'react';
import AdminLogin from '../AdminLogin';
import PasswordReset from '../../components/admin-login/PasswordReset';

const PasswordResetRoute = () => {
  return (
    <AdminLogin>
      <PasswordReset />
    </AdminLogin>
  );
};

export default PasswordResetRoute;
