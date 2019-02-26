import React from 'react';
import AdminLogin from '../AdminLogin';
import SigUp from '../../components/admin-login/SignUp';

const SignUpRoute = () => {
  return (
    <AdminLogin>
      <SigUp />
    </AdminLogin>
  );
};

export default SignUpRoute;
