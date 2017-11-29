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
          <label htmlFor="dropDown-1">{'FOOTER NAV 01'}</label>
          <ArrowRight
            htmlFor="dropDown-1"
            className="right-arrow"
            size={20}
            style={{color: '#fff', verticalAlign: 'middle'}}
          />
          <ul className="subDropDown">
            <Link to="">{'About'}</Link>
            <Link to="">{'Fermentum Ultricies'}</Link>
            <Link to="">{'Nullam'}</Link>
          </ul>
        </li>
      </ul>
      <ul className="mobile-footer-list">
        <input id="dropDown-2" type="checkbox" name="dropdown" />
        <li className="list-options">
          <label htmlFor="dropDown-2">{'SUPPORT'}</label>
          <ArrowRight
            htmlFor="dropDown-2"
            className="right-arrow"
            size={20}
            style={{color: '#fff', verticalAlign: 'middle'}}
          />
          <ul className="subDropDown">
            <Link to="">{'Help Center'}</Link>
            <Link to="">{'FAQ'}</Link>
            <Link to="">{'Email Us'}</Link>
            <Link to="">{'Terms'}</Link>
            <Link to="">{'Privacy'}</Link>
          </ul>
        </li>
      </ul>
      <ul className="mobile-footer-list">
        <input id="dropDown-3" type="checkbox" name="dropdown" />
        <li className="list-options">
          <label htmlFor="dropDown-3">{'FOOTER NAV 3'}</label>
          <ArrowRight
            htmlFor="dropDown-3"
            className="right-arrow"
            size={20}
            style={{color: '#fff', verticalAlign: 'middle'}}
          />
          <ul className="subDropDown">
            <Link to="">{'About'}</Link>
            <Link to="">{'Fermentum Ultricies'}</Link>
            <Link to="">{'Nullam'}</Link>
          </ul>
        </li>
      </ul>
      <ul className="mobile-footer-list social-icons-container">
        <li className="social-icons-title">{'SOCIAL'}</li>
        <li>
          <TwitterIcon />
          <FacebookIcon />
          <LinkedinIcon />
          <GitIcon />
        </li>
      </ul>
    </footer>
  );
};

export default MobileFooter;
