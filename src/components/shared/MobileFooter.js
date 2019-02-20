import React from 'react';
import {Link} from 'react-router';
import ArrowRight from '../shared/ArrowRight';
import FacebookIcon from '../shared/FacebookIcon';
import TwitterIcon from '../shared/TwitterIcon';
import LinkedinIcon from '../shared/LinkedinIcon';
import GitIcon from '../shared/GitIcon';

const MobileFooter = () => {
  return (
    <footer className="mobile-footer row grid">
      <ul className="mobile-footer-list">
        <input id="dropDown-1" type="checkbox" name="dropdown" />
        <li className="list-options">
          <label htmlFor="dropDown-1">{'LOGIN'}</label>
          <ArrowRight
            htmlFor="dropDown-1"
            className="right-arrow"
            size={20}
            style={{color: '#fff', verticalAlign: 'middle'}}
          />
          <ul className="subDropDown">
            <Link to="/admin-login">{'Admin Login'}</Link>
          </ul>
        </li>
      </ul>
      <ul className="mobile-footer-list">
        <input id="dropDown-2" type="checkbox" name="dropdown" />
        <li className="list-options">
          <label htmlFor="dropDown-2">{'RESOURCES'}</label>
          <ArrowRight
            htmlFor="dropDown-2"
            className="right-arrow"
            size={20}
            style={{color: '#fff', verticalAlign: 'middle'}}
          />
          <ul className="subDropDown">
            <Link to="/businesses">{'Search'}</Link>
            <Link to="/events">{'Events'}</Link>
            <Link to="/blog">{'Blog'}</Link>
          </ul>
        </li>
      </ul>
      <ul className="mobile-footer-list">
        <input id="dropDown-3" type="checkbox" name="dropdown" />
        <li className="list-options">
          <label htmlFor="dropDown-3">{'ABOUT'}</label>
          <ArrowRight
            htmlFor="dropDown-3"
            className="right-arrow"
            size={20}
            style={{color: '#fff', verticalAlign: 'middle'}}
          />
          <ul className="subDropDown">
            <Link to="">{'About'}</Link>
            <Link to="/contact-us">{'Contact'}</Link>
            <Link to="/terms-of-use">{'Terms & Conditions'}</Link>
            <Link to="/privacy-policy">{'Privacy Policy'}</Link>
          </ul>
        </li>
      </ul>
      <ul className="mobile-footer-list social-icons-container">
        <li className="social-icons-title">{'SOCIAL'}</li>
        <li>
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
        </li>
      </ul>
    </footer>
  );
};

export default MobileFooter;
