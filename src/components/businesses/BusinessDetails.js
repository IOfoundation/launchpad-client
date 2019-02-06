import React from 'react';

import MainSection from './details/MainSection';
import ServicesOffered from './details/ServicesOffered';
import Location from './details/Location';

const BusinessDetails = () => {
  return (
    <div className="business-deatils-wrapper">
      <MainSection />
      <section className="content-section contentContainer">
        <ServicesOffered />
        <Location />
      </section>
    </div>
  );
};

export default BusinessDetails;
