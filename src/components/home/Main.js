import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';
import BusinessesForm from './BusinessesForm';
import ServicesBox from '../services/ServicesBox';
import Logo from '../shared/Logo';

import Logo from '../shared/Logo';
const Main = ({
  services,
  handleClickOnServiceTag,
  handleSubmitSearchBusinessesForm,
}) => {
  return (
    <div>
      <section className="hero center-xs">
        <div className="hero_content">
          <Logo />
          <h2>
            {
              'Where startups and small businesses connect in California’s Central Valley'
            }
          </h2>
          <p>
            {
              'Over 650 resources to help your business grow est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. '
            }
          </p>
          <div className="hero_inputContainer">
            <BusinessesForm
              handleSubmitSearchBusinessesForm={
                handleSubmitSearchBusinessesForm
              }
            />
          </div>
          <Link className="hero_link" to="/businesses">
            {'View All Resources'}
          </Link>
        </div>
      </section>
      <section className="browseBy">
        <div className="browseBy_content">
          <h2 className="browseBy_title">{'Browse By Service'}</h2>
          <ServicesBox
            services={services}
            handleClickOnServiceTag={handleClickOnServiceTag}
          />
        </div>
      </section>
    </div>
  );
};

Main.propTypes = {
  handleClickOnServiceTag: PropTypes.func.isRequired,
  handleSubmitSearchBusinessesForm: PropTypes.func.isRequired,
  services: PropTypes.array.isRequired,
};

export default Main;
