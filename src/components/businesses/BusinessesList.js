import React from 'react';
import {PropTypes} from 'prop-types';

import Business from './Business';
const businessEx = {
  name: 'Lorem',
  description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor...',
  address: '1456 road',
  city: 'sacramento',
  country_code: '43',
  zip_code: '59828',
  phone: '5858585',
  email: 'adfas@fasdfas',
  Services: ['Service1', 'Service2'],
  Stages: ['Stage1', 'Stage2'],
  Communities: ['Communities', 'Communities'],
  businessLogo: 'static-data/images/test-logo.png',
  categories: ['Services', 'Stages', 'Communities'],
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
