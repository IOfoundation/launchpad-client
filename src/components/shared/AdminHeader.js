import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

import BarsIcon from '@Shared/barsIcon';

import * as userActions from '@Actions/user';
import {getAuthorization} from '@Utils';

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
    actions.signOut(auth, true);
  };

  render() {
    return (
      <header className="headerContainer" htmlFor="header-dropdown">
        <div className="contentContainer header grid between-xs middle-xs text-semi">
          <div className="header_links-title">
            <span className="header_title">
              <Link className="white-link not-clickable" style={{opacity: '1'}}>
                {'iFinder'}
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
  const auth = getAuthorization(_state);

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
