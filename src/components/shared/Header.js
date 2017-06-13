import React from 'react';
import {Link} from 'react-router';

const Header = () => {
  return (
    <header className="header row between-xs middle-xs">
      <div>
        <span className="header_title">{'Welcome to [project-name]'}</span>
        <span className="header_leftLink">
          {'Back to Lorem'}
        </span>
        <span className="header_leftLink">
          {'Global Nav 02'}
        </span>
      </div>
      <nav>
        <Link className="header_link" to="/contact-us">{'Contact Us'}</Link>
        <Link className="header_link" to="/terms-of-use">{'Terms of Use'}</Link>
        <Link className="header_link" to="/privacy-policy">
          {'Privacy Policy'}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
