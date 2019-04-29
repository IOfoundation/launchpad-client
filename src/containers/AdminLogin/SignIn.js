import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';

import Layout from '../Layout';
import SigIn from '../../components/admin-login/SigIn';

import * as userActions from '@Actions/user';
import {getAuthorization} from '@Utils';

class SignInRoute extends PureComponent {
  componentDidMount() {
    const {error, user, isAuth, router, Authorization} = this.props;

    if (error) {
      user.resetError();
    }

    if (isAuth && router.location.pathname === '/admin-login') {
      if (Authorization) {
        router.push('/admin/profile');
      }
    }
  }

  render() {
    return (
      <Layout>
        <SigIn />
      </Layout>
    );
  }
}

const mapStateToProps = _state => {
  const Authorization = getAuthorization(_state);

  return {
    error: _state.user.error,
    isAuth: Authorization !== '',
    Authorization,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    user: bindActionCreators(userActions, _dispatch),
  };
};

SignInRoute.propTypes = {
  Authorization: PropTypes.string,
  error: PropTypes.bool,
  isAuth: PropTypes.bool,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  user: PropTypes.shape({
    resetError: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInRoute);
