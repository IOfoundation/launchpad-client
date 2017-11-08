import React from 'react';
import {Link} from 'react-router';
import ArrowRight from '../shared/ArrowRight';

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
            <img src="/static-data/images/twitter-white-icon.svg" />
            <img src="/static-data/images/fb-white-icon.svg" />
            <img src="/static-data/images/in-white-icon.svg" />
            <img src="/static-data/images/git-white-icon.svg" />
          </li>
        </ul>
      </footer>
    );
  }
}

export default MobileFooter;
