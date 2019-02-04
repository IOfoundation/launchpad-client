import React from 'react';
import {Link} from 'react-router';
import Logo from './Logo';
import FacebookIcon from '../shared/FacebookIcon';
import TwitterIcon from '../shared/TwitterIcon';
import LinkedinIcon from '../shared/LinkedinIcon';
import GitIcon from '../shared/GitIcon';

const Footer = () => {
  return (
    <footer className="main-footer text-thin">
      <div className="contentContainer row">
        <div className="col-md-2 col-xs-2 text-xs-margin">
          <a className="logo-link" href="/">
            <Logo />
          </a>
        </div>
        <div
          data-test="footer-login"
          className="col-md-2 col-md-offset-1 col-xs-2 text-xs-margin"
        >
          <p className="main-footer_subtitle text-regular">{'LOGIN'}</p>
          <Link to="">{'Admin Login'}</Link>
        </div>
        <div
          data-test="footer-resources"
          className="col-md-2 col-xs-2 text-xs-margin"
        >
          <p className="main-footer_subtitle text-regular">{'RESOURCES'}</p>
          <Link to="">{'Search'}</Link>
          <Link to="">{'Events'}</Link>
          <Link to="">{'Blog'}</Link>
        </div>
        <div
          data-test="footer-about"
          className="col-md-2 col-xs-2 text-xs-margin"
        >
          <p className="main-footer_subtitle text-regular">{'ABOUT'}</p>
          <Link to="">{'About'}</Link>
          <Link to="/contact-us">{'Contact'}</Link>
          <Link to="/terms-of-use">{'Terms & Conditions'}</Link>
          <Link to="/privacy-policy">{'Privacy Policy'}</Link>
        </div>
        <div className="social-icons col-md-2 col-xs-2 text-xs-margin">
          <p className="main-footer_subtitle text-regular">{'SOCIAL'}</p>
          <Link className="main-footer_icon" to="">
            <TwitterIcon />
          </Link>
          <Link className="main-footer_icon" to="">
            <FacebookIcon />
          </Link>
          <Link className="main-footer_icon" to="">
            <LinkedinIcon />
          </Link>
          <Link className="main-footer_icon" to="">
            <GitIcon />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
