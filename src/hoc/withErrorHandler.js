import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';

import * as snackbarActions from '@Actions/snackbar';
import * as userInformationActions from '@Actions/user-information';
import * as userActions from '@Actions/user';
import {getAuthorization} from '@Utils';

const withErrorHandler = WrapperComponent => {
  class WithErrorHandler extends PureComponent {
    state = {
      error: {},
    };

    componentDidMount() {
      const {Authorization, userInformation} = this.props;

      if (Boolean(Authorization) === false) {
        this._displayErrorAndRedirect();
      } else {
        userInformation.getUserInformation({Authorization});
      }
    }

    componentDidUpdate() {
      const {userAuthorized} = this.props;

      if (!userAuthorized) {
        this._displayErrorAndRedirect();
      }
    }

    _displayErrorAndRedirect() {
      const {snackbar, router, isSigningOut, user} = this.props;
      let message = 'Unauthorized, please log in';

      if (isSigningOut) {
        message = 'You have been signed out';
      }

      snackbar.showSnackbar({
        message,
      });
      user.reset();
      router.replace('/admin-login');
    }

    render() {
      return (
        <Fragment>
          <WrapperComponent {...this.props} />
        </Fragment>
      );
    }
  }

  function mapStateToProps(_state) {
    const auth = getAuthorization(_state);

    return {
      Authorization: auth,
      isSigningOut: _state.errors.isSigningOut,
      userAuthorized: _state.errors.userAuthorized,
    };
  }
  function mapDispatchToProps(_dispatch) {
    return {
      snackbar: bindActionCreators(snackbarActions, _dispatch),
      userInformation: bindActionCreators(userInformationActions, _dispatch),
      user: bindActionCreators(userActions, _dispatch),
    };
  }

  WithErrorHandler.propTypes = {
    Authorization: PropTypes.string,
    isSigningOut: PropTypes.bool,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
    snackbar: PropTypes.shape({
      showSnackbar: PropTypes.func.isRequired,
    }),
    user: PropTypes.shape({
      reset: PropTypes.func.isRequired,
    }),
    userAuthorized: PropTypes.bool.isRequired,
    userInformation: PropTypes.shape({
      getUserInformation: PropTypes.func.isRequired,
    }),
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(WithErrorHandler));
};

export default withErrorHandler;
