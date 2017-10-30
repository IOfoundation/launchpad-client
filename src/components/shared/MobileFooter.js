import React from 'react';
import {Link} from 'react-router';
import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaGithubSquare,
} from 'react-icons/lib/fa';
import RightArrow from 'react-icons/lib/fa/angle-right';

class MobileFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };
  }
  _expandMenu() {
    this.setState({expand: !this.state.expand});
  }

  render() {
    return (
      <footer className="mobile-footer row grid">
        <ul className="mobile-footer-list">
          <input id="dropDown-1" type="checkbox" name="dropdown" />
          <li>
            <label htmlFor="dropDown-1">{'FOOTER NAV 01'}</label>
            <RightArrow htmlFor="dropDown-1" />
            <ul className="subDropDown">
              <Link to="">{'About'}</Link>
              <Link to="">{'Fermentum Ultricies'}</Link>
              <Link to="">{'Nullam'}</Link>
            </ul>
          </li>
        </ul>
        <ul className="mobile-footer-list">
          <input id="dropDown-2" type="checkbox" name="dropdown" />
          <li>
            <label htmlFor="dropDown-2">{'SUPPORT'}</label>
            <RightArrow htmlFor="dropDown-2" />
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
          <li>
            <label htmlFor="dropDown-3">{'FOOTER NAV 3'}</label>
            <RightArrow htmlFor="dropDown-3" />
            <ul className="subDropDown">
              <Link to="">{'About'}</Link>
              <Link to="">{'Fermentum Ultricies'}</Link>
              <Link to="">{'Nullam'}</Link>
            </ul>
          </li>
        </ul>
        <ul className="mobile-footer-list icons">
          <li className="social-icons">{'SOCIAL'}</li>
          <li>
            <FaTwitter size={24} />
            <FaFacebook size={24} />
            <FaLinkedin size={24} />
            <FaGithubSquare size={24} />
          </li>
        </ul>
      </footer>
    );
  }
}

export default MobileFooter;
