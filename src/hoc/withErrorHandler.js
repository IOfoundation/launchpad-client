import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';

import * as snackbarActions from '@Actions/snackbar';
import * as userInformationActions from '@Actions/user-information';
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
      const {snackbar, router} = this.props;

      snackbar.showSnackbar({
        message: 'Unauthorized, please log in',
      });
      router.push('/admin-login');
      sessionStorage.removeItem('userAuth');
      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('organizationId');
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
      userAuthorized: _state.errors.userAuthorized,
      Authorization: auth,
    };
  }
  function mapDispatchToProps(_dispatch) {
    return {
      snackbar: bindActionCreators(snackbarActions, _dispatch),
      userInformation: bindActionCreators(userInformationActions, _dispatch),
    };
  }

  WithErrorHandler.propTypes = {
    Authorization: PropTypes.string,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
    snackbar: PropTypes.shape({
      showSnackbar: PropTypes.func.isRequired,
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
