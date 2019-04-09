import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';

import * as snackbarActions from '@Actions/snackbar';

const withErrorHandler = (WrapperComponent, axios) => {
  class WithErrorHandler extends Component {
    constructor(props) {
      super(props);
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      this.reqResponse = axios.interceptors.response.use(
        res => res,
        error => {
          if (error && error.status === 401) {
            props.snackbar.showSnackbar({
              message: error.data.error,
            });
            props.router.push('/admin-login');
          }
          this.setState({error});
          return Promise.reject(error);
        }
      );
    }

    state = {
      error: {},
    };

    componentWillUnmount() {
      if (axios.interceptors.request) {
        axios.interceptors.request.eject(this.reqInterceptor);
      }

      if (axios.interceptors.reponse) {
        axios.interceptors.reponse.eject(this.reqResponse);
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

  function mapDispatchToProps(_dispatch) {
    return {
      snackbar: bindActionCreators(snackbarActions, _dispatch),
    };
  }

  WithErrorHandler.propTypes = {
    router: PropTypes.shape({
      push: PropTypes.func,
    }),
    snackbar: PropTypes.shape({
      showSnackbar: PropTypes.func,
    }),
  };

  return connect(
    null,
    mapDispatchToProps
  )(WithErrorHandler);
};

export default withErrorHandler;
