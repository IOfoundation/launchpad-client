import React from 'react';
import {Link} from 'react-router';
import Logo from './Logo';
import {FaTwitter, FaFacebook, FaLinkedin} from 'react-icons/lib/fa';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="contentContainer row">
        <div className="col-md-2 col-xs-12 text-xs-margin">
          <a className="logo-link" href="/">
            <Logo />
          </a>
        </div>
        <div className="col-md-2 col-md-offset-1 col-xs-6 text-xs-margin">
          <p className="main-footer_subtitle">{'FOOTER NAV 01'}</p>
          <Link to="">{'About'}</Link>
          <Link to="">{'Fermentum Ultricies'}</Link>
          <Link to="">{'Nullam'}</Link>
        </div>
        <div className="col-md-2 col-xs-6 text-xs-margin">
          <p className="main-footer_subtitle">{'SUPPORT'}</p>
          <Link to="">{'Help Center'}</Link>
          <Link to="">{'FAQ'}</Link>
          <Link to="">{'Email Us'}</Link>
          <Link to="">{'Terms'}</Link>
          <Link to="">{'Privacy'}</Link>
        </div>
        <div className="col-md-2 col-xs-6 text-xs-margin">
          <p className="main-footer_subtitle">{'FOOTER NAV 3'}</p>
          <Link to="">{'About'}</Link>
          <Link to="">{'Fermentum Ultricies'}</Link>
          <Link to="">{'Nullam'}</Link>
        </div>
        <div className="col-md-1 col-md-offset-2 col-xs-6 text-xs-margin">
          <p className="main-footer_subtitle">{'SOCIAL'}</p>
          <Link className="main-footer_icon" to="">
            <FaTwitter size={12} color={'white'} />
          </Link>
          <Link className="main-footer_icon" to="">
            <FaFacebook size={12} color={'white'} />
          </Link>
          <Link className="main-footer_icon" to="">
            <FaLinkedin size={12} color={'white'} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
