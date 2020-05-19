import React, {Fragment} from 'react';
import {PropTypes} from 'prop-types';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import BarsIcon from '@Shared/barsIcon';

import * as blogsActions from '@Actions/blogs';
import * as userActions from '@Actions/user';
import {getAuthorization} from '@Utils';

const activeStyles = {opacity: '1'};

const Header = props => {
  let button;

  const setDefaultCategory = () => {
    props.actions.setCategory('front page');
  };

  const signOut = event => {
    const {user, Authorization, router} = props;

    event.preventDefault();
    user.signOut(Authorization, true);
    router.push('/admin-login');
  };

  if (props.isAuth) {
    button = (
      <Fragment>
        <a className="header_link white-link" onClick={signOut}>
          {'Logout'}
        </a>
        <Link className="header_link white-link" to="/admin/profile">
          {'Admin'}
        </Link>
      </Fragment>
    );
  } else {
    button = (
      <Link
        activeStyle={activeStyles}
        className="header_link white-link"
        to="/admin-login"
      >
        {'Admin Login'}
      </Link>
    );
  }

  return (
    <header className="headerContainer" htmlFor="header-dropdown">
      <div className="contentContainer header grid between-xs middle-xs text-semi">
        <div className="header_links-title">
          <span className="header_title">
            <IndexLink
              to="/"
              className="white-link text-bold"
              style={activeStyles}
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
          {button}
        </nav>
      </div>
    </header>
  );
};

const mapStateToProps = _state => {
  const Authorization = getAuthorization(_state);

  return {
    isAuth: Authorization !== '',
    Authorization,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(blogsActions, _dispatch),
    user: bindActionCreators(userActions, _dispatch),
  };
};

Header.propTypes = {
  actions: PropTypes.shape({
    setCategory: PropTypes.func,
  }),
  Authorization: PropTypes.string,
  homePage: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  user: PropTypes.shape({
    signOut: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
