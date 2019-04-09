import React from 'react';
import {PropTypes} from 'prop-types';

import Layout from './Layout';
import Locations from '../../components/admin-site/elements/Locations';

const LocationsRoute = props => {
  return (
    <Layout router={props.router}>
      <Locations />
    </Layout>
  );
};

LocationsRoute.propTypes = {
  router: PropTypes.shape({}),
};

export default LocationsRoute;
