import React from 'react';
import {PropTypes} from 'prop-types';

import Business from './Business';

const businessEx = {
  name: 'Business name',
  logo: 'static-data/images/test-logo.png',
  address: '1456 Summerdale Rd',
  city: 'corvallis',
  country_code: '1',
  zip_code: '59828',
  phone: '555-5555-5555',
  email: 'asdf@asdff.com',
  description:
    'Alphapointe is a diverse company that includes office supply stores, Call Center Services, plastics, office products, janitorial products, and textile manufacturing, and Low Vision Services.  It also offers more than 50,000 office supply products to businesses in the Kansas City area and nationally at www.alphapointeonline.com . Formed as a 501(c)(3) not-for-profit in 1911, Alphapointe is the largest employer of the blind in the state of Missouri.  It operates nine facilities in four states. The organization provides jobs and services to those who have lost sight.',
  Services: ['service1'],
  Stages: ['stages'],
  Communities: ['Communities'],
};

const BusinessesList = ({businesses, handleClickOnBusiness, expanded}) => {
  return (
    <div>
      <Business
        business={businessEx}
        handleClickOnBusiness={handleClickOnBusiness}
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
