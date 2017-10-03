import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';
import BusinessesForm from './BusinessesForm';
import Logo from '../shared/Logo';

const Main = ({handleSubmitSearchBusinessesForm}) => {
  return (
    <div>
      <section className="hero center-xs">
        <div className="container-center">
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
          <div className="grid container-center--middle mt-20">
            <Link
              className="link col-xs-12 col-md-6 col-lg-4 m-bot-16"
              to="/businesses?category[]=Bussines%20Planning/Managment"
            >
              Bussines Planning/Managment
            </Link>
            <Link
              className="link col-xs-12 col-md-6 col-lg-3 m-bot-16"
              to="/businesses?category[]=Capital"
            >
              Capital Legal Services
            </Link>
            <Link
              className="link col-xs-12 col-md-6 col-lg-2 m-bot-16"
              to="/businesses?category[]=Marketing/Sales"
            >
              Marketing/Sales
            </Link>
            <Link
              className="link col-xs-12 col-md-6 col-lg-3 m-bot-16"
              to="/businesses?category[]=Physical%20Space"
            >
              Physical Space
            </Link>
          </div>
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
