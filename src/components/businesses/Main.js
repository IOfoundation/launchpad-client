import React from 'react';
import {PropTypes} from 'prop-types';

import BusinessesList from './BusinessesList';
import Business from './Business';
import MapView from './MapView';
import Pagination from './Pagination';
import ResultInfo from './ResultInfo';

const Main = ({businesses}) => {
  return (
    <div className="">
      <div className="">
        <ResultInfo />
      </div>
      <div className="">
        <div className="">
          <BusinessesList businesses={businesses} />
          <Pagination />
        </div>
        <div className="">
          <MapView />
        </div>
      </div>
    </div>
  );
};

Main.propTypes = {
  businesses: PropTypes.array.isRequired,
};

export default Main;
