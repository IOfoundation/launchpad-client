import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';

import * as snackbarActions from '@Actions/snackbar';

const withErrorHandler = WrapperComponent => {
  class WithErrorHandler extends PureComponent {
    state = {
      error: {},
    };

    componentDidMount() {
      const {auth} = this.props;

      if (auth === false) {
        this._displayErrorAndRedirect();
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
        message: 'Unauthorized, please login again',
      });
      router.push('/admin-login');
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
    const auth = _state.user.authorization || localStorage.getItem('userAuth');

    return {
      userAuthorized: _state.errors.userAuthorized,
      auth: auth !== '',
    };
  }
  function mapDispatchToProps(_dispatch) {
    return {
      snackbar: bindActionCreators(snackbarActions, _dispatch),
    };
  }

  WithErrorHandler.propTypes = {
    auth: PropTypes.bool,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
    snackbar: PropTypes.shape({
      showSnackbar: PropTypes.func.isRequired,
    }),
    userAuthorized: PropTypes.bool.isRequired,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithErrorHandler);
};

export default withErrorHandler;
