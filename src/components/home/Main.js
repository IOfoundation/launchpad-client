import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';
import BusinessesForm from './BusinessesForm';

import MainLayout from '../layouts/Main';
import ServicesBox from '../services/ServicesBox';
import WelcomeCard from './WelcomeCard';

const Main = ({
  services,
  handleClickOnServiceTag,
  handleSubmitSearchBusinessesForm,
}) => {
  return (
    <div>
      <section>
        <BusinessesForm
          handleSubmitSearchBusinessesForm={handleSubmitSearchBusinessesForm}
        />
        <Link to="/businesses">{'View All Resources'}</Link>
      </section>
      <WelcomeCard />
      <section>
        <h2>Browse By Service</h2>
        <ServicesBox
          services={services}
          handleClickOnServiceTag={handleClickOnServiceTag}
        />
      </section>
    </div>
  );
};

Main.propTypes = {
  services: PropTypes.array.isRequired,
  handleClickOnServiceTag: PropTypes.func.isRequired,
  handleSubmitSearchBusinessesForm: PropTypes.func.isRequired,
};

export default Main;
