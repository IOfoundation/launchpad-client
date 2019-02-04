import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';
import BarsIcon from '../shared/barsIcon';

const Header = () => {
  return (
    <header className="headerContainer" htmlFor="header-dropdown">
      <div className="contentContainer header grid between-xs middle-xs text-thin">
        <div className="header_links-title">
          <span className="header_title">
            <Link to="/" className="white-link">
              {'Welcome to Resource Finder'}
            </Link>
          </span>
        </div>
        <input id="header-dropdown" type="checkbox" name="dropdown" />
        <label htmlFor="header-dropdown" className="collapse-menu-icon">
          <BarsIcon size={24} />
        </label>
        <nav className="header_links-contact">
          <Link className="header_link" to="/businesses">
            {'Resources'}
          </Link>
          <Link className="header_link" to="/events">
            {'Events'}
          </Link>
          <Link className="header_link" to="/blog">
            {'Blog'}
          </Link>
          <Link className="header_link" to="/admin-login">
            {'Admin Login'}
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
