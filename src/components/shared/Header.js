import React from 'react';
import {Link} from 'react-router';
import FaBars from 'react-icons/lib/fa/bars';
import Logo from './Logo';

const Header = pathname => {
  return (
    <header className="headerContainer" htmlFor="header-dropdown">
      <div className="contentContainer header grid between-xs middle-xs">
        <div className="header_links-title">
          <Link to="/"><Logo /></Link>
          <span className="header_title">{'Welcome to IO Ipsum'}</span>
          <span className="header_leftLink">{'Back to Lorem'}</span>
        </div>
        <input id="header-dropdown" type="checkbox" name="dropdown" />
        <label htmlFor="header-dropdown" className="collapse-menu-icon">
          <FaBars size={24} />
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

export default Header;
