import React from 'react';
import AdminLogin from '../AdminLogin';
import AccountRequested from '../../components/admin-login/AccountRequested';

const AccountRequestedRoute = () => {
  return (
    <AdminLogin>
      <AccountRequested />
    </AdminLogin>
  );
};

export default AccountRequestedRoute;
