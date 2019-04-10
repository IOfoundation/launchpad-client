import React from 'react';
import {PropTypes} from 'prop-types';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import BarsIcon from '@Shared/barsIcon';

import * as blogsActions from '@Actions/blogs';

const activeStyles = {opacity: '1'};

const Header = props => {
  const setDefaultCategory = () => {
    props.actions.setCategory('front page');
  };
  return (
    <header className="headerContainer" htmlFor="header-dropdown">
      <div className="contentContainer header grid between-xs middle-xs text-semi">
        <div className="header_links-title">
          <span className="header_title">
            <IndexLink
              to="/"
              className="white-link text-bold"
              activeStyle={activeStyles}
            >
              {'Welcome to Resource Finder'}
            </IndexLink>
          </span>
        </div>
        <input id="header-dropdown" type="checkbox" name="dropdown" />
        <label htmlFor="header-dropdown" className="collapse-menu-icon">
          <BarsIcon size={24} />
        </label>
        <nav className="header_links-contact text-bold">
          <Link
            activeStyle={activeStyles}
            className="header_link white-link "
            to="/businesses"
          >
            {'Resources'}
          </Link>
          <Link
            activeStyle={activeStyles}
            className="header_link white-link"
            to="/events"
          >
            {'Events'}
          </Link>
          <Link
            activeStyle={activeStyles}
            className="header_link white-link"
            to="/blog"
            onClick={setDefaultCategory}
          >
            {'Blog'}
          </Link>
          <Link
            activeStyle={activeStyles}
            className="header_link white-link"
            to="/admin-login"
          >
            {'Admin Login'}
          </Link>
        </nav>
      </div>
    </header>
  );
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(blogsActions, _dispatch),
  };
};

Header.propTypes = {
  actions: PropTypes.shape({
    setCategory: PropTypes.func,
  }),
  homePage: PropTypes.bool.isRequired,
};

export default connect(
  null,
  mapDispatchToProps
)(Header);
