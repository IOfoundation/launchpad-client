import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';
import BarsIcon from '../shared/barsIcon';
import Logo from './Logo';

const Header = ({homePage}) => {
  return (
    <header className="headerContainer" htmlFor="header-dropdown">
      <div className="contentContainer header grid between-xs middle-xs text-thin">
        <div className="header_links-title">
          {!homePage && (
            <Link to="/">
              <Logo />
            </Link>
          )}
          <span className="header_title">{'Welcome to IO Ipsum'}</span>
          {!homePage && (
            <Link to="/">
              <span className="header_leftLink text-regular">
                {'Back to Home'}
              </span>
            </Link>
          )}
        </div>
        <input id="header-dropdown" type="checkbox" name="dropdown" />
        <label htmlFor="header-dropdown" className="collapse-menu-icon">
          <BarsIcon size={24} />
        </label>
        <nav className="header_links-contact">
          <Link className="header_link" to="/contact-us">
            {'Contact Us'}
          </Link>
          <Link className="header_link" to="/terms-of-use">
            {'Terms of Use'}
          </Link>
          <Link className="header_link" to="/privacy-policy">
            {'Privacy Policy'}
          </Link>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  homePage: PropTypes.bool.isRequired,
};

export default Header;
