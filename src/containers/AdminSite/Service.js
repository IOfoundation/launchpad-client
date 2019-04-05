import React from 'react';
import {PropTypes} from 'prop-types';

import Layout from './Layout';
import ServiceFormContainer from '../../components/admin-site/elements/ServiceFormContainer';

const ServiceRoute = props => {
  return (
    <Layout router={props.router}>
      <ServiceFormContainer />
    </Layout>
  );
};

ServiceRoute.propTypes = {
  router: PropTypes.shape({}),
};

export default ServiceRoute;
