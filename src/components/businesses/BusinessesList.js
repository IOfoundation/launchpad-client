import React from 'react';
import {PropTypes} from 'prop-types';

import Business from './Business';

const BusinessesList = ({businesses, handleClickOnBusiness, expanded}) => {
  return (
    <div>
      {businesses.map(business => {
        return (
          <Business
            business={business}
            key={business.id}
            handleClickOnBusiness={handleClickOnBusiness}
          />
        );
      })}
    </div>
  );
};

BusinessesList.propTypes = {
  businesses: PropTypes.array.isRequired,
  handleClickOnBusiness: PropTypes.func.isRequired,
  expanded: PropTypes.bool,
};

export default BusinessesList;
