import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';

import * as userActions from '../../actions/user';
import AdminLogin from '../AdminLogin';
import SigIn from '../../components/admin-login/SigIn';

const SignInRoute = props => {
  const {user, error} = props;

  if (error) {
    user.resetError();
  }

  return (
    <AdminLogin>
      <SigIn />
    </AdminLogin>
  );
};

const mapDispatchToProps = _dispatch => {
  return {
    user: bindActionCreators(userActions, _dispatch),
  };
};

const mapStateToProps = _state => {
  return {
    error: _state.user.error,
  };
};

SignInRoute.propTypes = {
  error: PropTypes.bool,
  user: PropTypes.shape({
    resetError: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInRoute);
