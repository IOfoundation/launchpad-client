import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="row">
      <div className="col-md-2">
        <Logo />
      </div>
      <div className="col-md-2 col-md-offset-1">
        <p className="footer_subtitle">{'FOOTER NAV'}</p>
        <Link to="about">{'About'}</Link>
        <Link to="about">{'Fermentum Ultricies'}</Link>
        <Link to="about">{'Nullam'}</Link>
      </div>
      <div className="col-md-2">
        <p className="footer_subtitle">{'FOOTER NAV'}</p>
        <Link to="about">{'About'}</Link>
        <Link to="about">{'Fermentum Ultricies'}</Link>
        <Link to="about">{'Nullam'}</Link>
      </div>
      <div className="col-md-2">
        <p className="footer_subtitle">{'FOOTER NAV'}</p>
        <Link to="about">{'About'}</Link>
        <Link to="about">{'Fermentum Ultricies'}</Link>
        <Link to="about">{'Nullam'}</Link>
      </div>
      <div className="col-md-2 col-md-offset-1">
        <p className="footer_subtitle">{'SOCIAL'}</p>
        <Link to="twitter"><img src="" /></Link>
        <Link to="twitter"><img src="" /></Link>
        <Link to="twitter"><img src="" /></Link>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
