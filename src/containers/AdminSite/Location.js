import React from 'react';
import {PropTypes} from 'prop-types';

import Layout from './Layout';
import LocationFormContainer from '../../components/admin-site/elements/LocationFormContainer';

const LocationFormRoute = props => {
  return (
    <Layout>
      <LocationFormContainer breakpoint={props.breakpoint} />
    </Layout>
  );
};

LocationFormRoute.propTypes = {
  breakpoint: PropTypes.string,
};

export default LocationFormRoute;
