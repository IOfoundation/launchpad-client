import React from 'react';

import MainSection from './details/MainSection';
import ServicesOffered from './details/ServicesOffered';
import Locations from './details/Locations';

const BusinessDetails = () => {
  return (
    <div className="business-deatils-wrapper">
      <MainSection />
      <section className="content-section contentContainer">
        <ServicesOffered />
        <Locations />
      </section>
    </div>
  );
};

export default BusinessDetails;
