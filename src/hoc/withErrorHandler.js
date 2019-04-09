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

    componentDidUpdate() {
      const {userAuthorized, snackbar, router} = this.props;

      if (!userAuthorized) {
        snackbar.showSnackbar({
          message: 'User Unauthorized',
        });
        router.push('/admin-login');
      }
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
    return {
      userAuthorized: _state.errors.userAuthorized,
    };
  }
  function mapDispatchToProps(_dispatch) {
    return {
      snackbar: bindActionCreators(snackbarActions, _dispatch),
    };
  }

  WithErrorHandler.propTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
    snackbar: PropTypes.shape({
      showSnackbar: PropTypes.func.isRequired,
    }),
    userAuthorized: PropTypes.boolisRequired,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithErrorHandler);
};

export default withErrorHandler;
