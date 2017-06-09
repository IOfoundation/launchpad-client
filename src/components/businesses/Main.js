import React from 'react';
import {PropTypes} from 'prop-types';

import BusinessesList from './BusinessesList';
import Business from './Business';
import MapView from './MapView';
import Pagination from './Pagination';
import ResultInfo from './ResultInfo';

const Main = ({businesses, businessesMetadata}) => {
  return (
    <div className="">
      <div className="">
        <ResultInfo businessesMetadata={businessesMetadata} />
      </div>
      <div className="">
        <div className="">
          <BusinessesList businesses={businesses} />
          <Pagination businessesMetadata={businessesMetadata} />
        </div>
        <div style={{width: '500px', height: '500px'}}>
          <MapView businesses={businesses} />
        </div>
      </div>
    </div>
  );
};

Main.propTypes = {
  businesses: PropTypes.array.isRequired,
  businessesMetadata: PropTypes.object.isRequired,
};

export default Main;
