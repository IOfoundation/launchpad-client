import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

import BarsIcon from '../shared/barsIcon';

import * as userActions from '@Actions/user';

class AdminHeader extends PureComponent {
  componentDidUpdate(prevProps) {
    if (prevProps.singOutSuccess !== this.props.singOutSuccess) {
      if (this.props.singOutSuccess) {
        this.props.router.push('/admin-login');
      }
    }
  }

  signOut = () => {
    const {actions, auth} = this.props;
    actions.signOut(auth);
  };

  render() {
    return (
      <header className="headerContainer" htmlFor="header-dropdown">
        <div className="contentContainer header grid between-xs middle-xs text-semi">
          <div className="header_links-title">
            <span className="header_title">
              <Link to="/" className="white-link">
                {'Welcome to Resource Finder'}
              </Link>
            </span>
          </div>
          <input id="header-dropdown" type="checkbox" name="dropdown" />
          <label htmlFor="header-dropdown" className="collapse-menu-icon">
            <BarsIcon size={24} />
          </label>
          <nav className="header_links-contact text-bold">
            <div
              className="header_link title-as-link"
              to="#"
              style={{opacity: '1'}}
              onClick={this.signOut}
            >
              {'Log Out'}
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

const mapStateToProps = _state => {
  const auth = _state.user.authorization || sessionStorage.getItem('userAuth');
  return {
    auth,
    singOutSuccess: _state.user.signOut.success,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(userActions, _dispatch),
  };
};

AdminHeader.propTypes = {
  actions: PropTypes.shape({
    signOut: PropTypes.func,
  }),
  auth: PropTypes.string,
  homePage: PropTypes.bool.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  singOutSuccess: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminHeader));
