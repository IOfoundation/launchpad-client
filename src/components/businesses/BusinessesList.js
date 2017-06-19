import React from 'react';
import {PropTypes} from 'prop-types';

import Business from './Business';
const businessEx = {
  name: 'Business Name',
  address: '555 Baker Street',
  city: 'London',
  phone: '555-555-555',
  email: 'email@gmail.com',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  country_code: '+1',
  zip_code: '55555',
  categories: ['BusinessType', 'Stage', 'Coumminty', 'Industry'],
};
const BusinessesList = ({businesses, handleClickOnBusiness, expanded}) => {
  return (
    <div>
      <Business
        business={businessEx}
        handleClickOnBusiness={handleClickOnBusiness}
        expanded={expanded}
      />
      {businesses.map(business => {
        return (
          <Business
            business={business}
            key={business.id}
            handleClickOnBusiness={handleClickOnBusiness}
            expanded={expanded}
          />
        );
      })}
    </div>
  );
};

BusinessesList.propTypes = {
  businesses: PropTypes.array.isRequired,
  expanded: PropTypes.bool,
  handleClickOnBusiness: PropTypes.func.isRequired,
};

export default BusinessesList;
