import React from 'react';
import {PropTypes} from 'prop-types';

import Business from './Business';

const BusinessesList = ({businesses}) => {
  return (
    <div>
      {businesses.map(business => {
        return <Business business={business} key={business.id} />;
      })}
    </div>
  );
};

BusinessesList.propTypes = {
  businesses: PropTypes.array.isRequired,
};

export default BusinessesList;
