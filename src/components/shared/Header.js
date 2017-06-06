import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';

const Header = () => {
  return (
    <header>
      <ul>
        <li>Welcome to [project-name]</li>
        <li><a href="#">Back to Lorem</a></li>
        <li><a href="#">Global Nav 02</a></li>
      </ul>
      <nav>
        <Link to="/contact-us">{'Contact Us'}</Link>
        <Link to="/terms-of-use">{'Terms of Use'}</Link>
        <Link to="/privacy-policy">{'Privacy Policy'}</Link>
      </nav>
    </header>
  );
};

Header.propTypes = {};

export default Header;
