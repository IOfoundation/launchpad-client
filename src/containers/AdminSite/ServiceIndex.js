import React from 'react';
import {PropTypes} from 'prop-types';

import Layout from './Layout';
import Services from '../../components/admin-site/elements/Services';

const ServiceIndexRoute = props => {
  return (
    <Layout router={props.router}>
      <Services />
    </Layout>
  );
};

ServiceIndexRoute.propTypes = {
  router: PropTypes.shape({}),
};

export default ServiceIndexRoute;
