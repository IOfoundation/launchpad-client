import React from 'react';
import {Link} from 'react-router';
import Logo from './Logo';
import {FaTwitter, FaFacebook, FaLinkedin} from 'react-icons/lib/fa';

const Footer = () => {
  return (
    <footer className="">
      <div className="contentContainer row">
        <div className="col-md-2">
          <Logo />
        </div>
        <div className="col-md-2 col-md-offset-1">
          <p className="footer_subtitle">{'FOOTER NAV'}</p>
          <Link to="">{'About'}</Link>
          <Link to="">{'Fermentum Ultricies'}</Link>
          <Link to="">{'Nullam'}</Link>
        </div>
        <div className="col-md-2">
          <p className="footer_subtitle">{'FOOTER NAV'}</p>
          <Link to="">{'About'}</Link>
          <Link to="">{'Fermentum Ultricies'}</Link>
          <Link to="">{'Nullam'}</Link>
        </div>
        <div className="col-md-2">
          <p className="footer_subtitle">{'FOOTER NAV'}</p>
          <Link to="">{'About'}</Link>
          <Link to="">{'Fermentum Ultricies'}</Link>
          <Link to="">{'Nullam'}</Link>
        </div>
        <div className="col-md-1 col-md-offset-2">
          <p className="footer_subtitle">{'SOCIAL'}</p>
          <Link className="footer_socialIcon" to="">
            <FaTwitter size={12} color={'white'} />
          </Link>
          <Link className="footer_socialIcon" to="">
            <FaFacebook size={12} color={'white'} /><img src="" />
          </Link>
          <Link className="footer_socialIcon" to="">
            <FaLinkedin size={12} color={'white'} /><img src="" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
