import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';
import BusinessesForm from './BusinessesForm';
import Logo from '../shared/Logo';

const Main = ({search_results, getTextSearchResults}) => {
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
              search_results={search_results}
              getTextSearchResults={getTextSearchResults}
            />
          </div>
          <div className="margin-auto margin-y-20">
            <Link
              className="link p-bot-10 margin-x-16 m-bot-16"
              to="/businesses?category=Planning/Management"
            >
              {'Business Planning/Managment'}
            </Link>
            <Link
              className="link p-bot-10 margin-x-16"
              to="/businesses?category=Capital"
            >
              {'Capital'}
            </Link>
            <Link
              className="link p-bot-10 margin-x-16"
              to="/businesses?category=Legal%20Services"
            >
              {'Legal Services'}
            </Link>
            <Link
              className="link p-bot-10 margin-x-16"
              to="/businesses?category=Marketing/Sales"
            >
              {'Marketing/Sales'}
            </Link>
            <Link
              className="link p-bot-10 margin-x-16"
              to="/businesses?category=Physical%20Space"
            >
              {'Physical Space'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

Main.propTypes = {
  ResultsBusinesses: PropTypes.func,
  search_results: PropTypes.arrayOf(PropTypes.object),
};

export default Main;
