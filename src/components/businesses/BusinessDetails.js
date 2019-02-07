import React from 'react';
import {PropTypes} from 'prop-types';

import MainSection from './details/MainSection';
import ServicesOffered from './details/ServicesOffered';
import Locations from './details/Locations';
import SocialBar from './details/SocialBar';

const BusinessDetails = props => {
  const {organization} = props;
  let $details = (
    <div className="load-div">
      <img className="loader" src="/static-data/images/loader.gif" />
      <h3 className="loader-text text-regular">{'Loading'}</h3>
    </div>
  );
  const socialInformation = {
    twitter: organization.twitter,
    facebook: organization.facebook,
    website: organization.website,
    phone: organization.phones && organization.phones[0].number,
    email: organization.email,
    linkedin: organization.linkedin,
  };

  if (Object.keys(organization).length) {
    $details = (
      <div className="business-deatils-wrapper">
        <MainSection organization={organization} />
        <SocialBar socialInformation={socialInformation} />
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
