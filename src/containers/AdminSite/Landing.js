import React from 'react';
import {PropTypes} from 'prop-types';

import Layout from './Layout';
import LandingComponent from '../../components/admin-site/Landing';

const Landing = props => {
  return (
    <Layout router={props.router}>
      <LandingComponent />
    </Layout>
  );
};

Landing.propTypes = {
  router: PropTypes.shape({}),
};

export default Landing;
