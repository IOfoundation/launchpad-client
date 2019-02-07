import React from 'react';

import MainSection from './details/MainSection';
import ServicesOffered from './details/ServicesOffered';
import Locations from './details/Locations';
import {PropTypes} from 'prop-types';

const BusinessDetails = props => {
  const {organization} = props;
  let $details = null;

  if (Object.keys(organization).length) {
    $details = (
      <div className="business-deatils-wrapper">
        <MainSection organization={organization} />
        <section className="content-section contentContainer">
          <ServicesOffered services={organization.services} />
          <Locations locations={organization.locations} />
        </section>
      </div>
    );
  }

  return $details;
};

BusinessDetails.propTypes = {
  organization: PropTypes.shape({
    services: PropTypes.arrayOf(PropTypes.object),
    locations: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default BusinessDetails;
