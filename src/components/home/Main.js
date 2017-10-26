import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';
import BusinessesForm from './BusinessesForm';
import Logo from '../shared/Logo';

const Main = ({items, getTextSearchResults}) => {
  return (
    <div>
      <section className="hero center-xs">
        <div>
          <div className="logo-container">
            <Logo />
          </div>
          <div className="col-lg-12">
            <h2 className="desktop-devices">
              {'Where startups and small businesses connect in'}
              <br />
              {'California’s Capital Region'}
            </h2>
            <h2 className="mobile-devices">
              {
                'Where startups and small businesses connect in California’s Capital Region'
              }
            </h2>
            <div className="desktop-devices">
              <p>
                {
                  'Over 650 resources to help your business grow est non commodo luctus,'
                }
                <br />
                {'nisi erat porttitor ligula, eget lacinia odio sem nec elit.'}
              </p>
            </div>
            <div className="mobile-devices m-top-16">
              <p>
                {
                  'Over 650 resources to help your business grow est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.'
                }
              </p>
            </div>
            <div className="hero_inputContainer">
              <BusinessesForm
                items={items}
                getTextSearchResults={getTextSearchResults}
              />
            </div>
            <div className="margin-auto margin-y-20">
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
