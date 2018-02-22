import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';
import BusinessesForm from './BusinessesForm';
import Logo from '../shared/Logo';

const Main = ({items, getTextSearchResults}) => {
  return (
    <div>
      <section className="hero center-xs">
        <div className="container-mid">
          <div className="center-x">
            <div className="logo-container">
              <Logo />
            </div>
            <div className="col-lg-12">
              <h2 className="desktop-devices text-bold">
                {'Connecting startups and small businesses'}
                <br />
                {'to the resources they need to grow'}
              </h2>
              <h2 className="mobile-devices text-bold">
                {
                  'Connecting startups and small businesses to the resources they need to grow'
                }
              </h2>
              <div className="hero_inputContainer">
                <BusinessesForm
                  items={items}
                  getTextSearchResults={getTextSearchResults}
                />
              </div>
              <div className="margin-auto margin-y-20 text-thin">
                <Link
                  className="link hero-link p-bot-10 margin-x-16 m-bot-16"
                  to="/businesses?category=Planning/Management"
                >
                  {'Business Planning/Managment'}
                </Link>
                <Link
                  className="link hero-link p-bot-10 margin-x-16"
                  to="/businesses?category=Capital"
                >
                  {'Capital'}
                </Link>
                <Link
                  className="link hero-link p-bot-10 margin-x-16"
                  to="/businesses?category=Legal%20Services"
                >
                  {'Legal Services'}
                </Link>
                <Link
                  className="link hero-link p-bot-10 margin-x-16"
                  to="/businesses?category=Marketing/Sales"
                >
                  {'Marketing/Sales'}
                </Link>
                <Link
                  className="link hero-link p-bot-10 margin-x-16"
                  to="/businesses?category=Physical%20Space"
                >
                  {'Physical Space'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Main.propTypes = {
  getTextSearchResults: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object),
  ResultsBusinesses: PropTypes.func,
};

export default Main;
