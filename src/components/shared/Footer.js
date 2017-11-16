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
        <div className="col-md-2 col-xs-12 text-xs-margin">
          <a className="logo-link" href="/">
            <Logo />
          </a>
        </div>
        <div className="col-md-2 col-md-offset-1 col-xs-6 text-xs-margin">
          <p className="main-footer_subtitle text-regular">{'FOOTER NAV 01'}</p>
          <Link to="">{'About'}</Link>
          <Link to="">{'Fermentum Ultricies'}</Link>
          <Link to="">{'Nullam'}</Link>
        </div>
        <div className="col-md-2 col-xs-6 text-xs-margin">
          <p className="main-footer_subtitle text-regular">{'SUPPORT'}</p>
          <Link to="">{'Help Center'}</Link>
          <Link to="">{'FAQ'}</Link>
          <Link to="">{'Email Us'}</Link>
          <Link to="">{'Terms'}</Link>
          <Link to="">{'Privacy'}</Link>
        </div>
        <div className="col-md-2 col-xs-6 text-xs-margin">
          <p className="main-footer_subtitle text-regular">{'FOOTER NAV 3'}</p>
          <Link to="">{'About'}</Link>
          <Link to="">{'Fermentum Ultricies'}</Link>
          <Link to="">{'Nullam'}</Link>
        </div>
        <div className="social-icons col-md-2 col-md-offset-1 col-xs-6 text-xs-margin">
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
