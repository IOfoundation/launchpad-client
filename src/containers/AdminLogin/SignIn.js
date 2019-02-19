import React from 'react';
import AdminLogin from '../AdminLogin';
import SigIn from '../../components/admin-login/SigIn';

const SignInRoute = () => {
  return (
    <AdminLogin>
      <SigIn />
    </AdminLogin>
  );
};

export default SignInRoute;
