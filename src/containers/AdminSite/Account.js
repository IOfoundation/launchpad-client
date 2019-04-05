import React from 'react';
import {PropTypes} from 'prop-types';
import Layout from './Layout';
import AccountContainer from '../../components/admin-site/elements/AccountContainer';

const AccountRoute = props => {
  return (
    <Layout router={props.router}>
      <AccountContainer />
    </Layout>
  );
};

AccountRoute.propTypes = {
  router: PropTypes.shape({}),
};

export default AccountRoute;
