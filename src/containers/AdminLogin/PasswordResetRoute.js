import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';

import AdminLogin from '../AdminLogin';
import PasswordReset from '../../components/admin-login/PasswordReset';
import * as userActions from '../../actions/user';

const PasswordResetRoute = props => {
  const {user, error} = props;

  if (error) {
    user.resetError();
  }

  return (
    <AdminLogin>
      <PasswordReset />
    </AdminLogin>
  );
};

const mapStateToProps = _state => {
  return {
    error: _state.error,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    user: bindActionCreators(userActions, _dispatch),
  };
};

PasswordResetRoute.propTypes = {
  error: PropTypes.bool,
  user: PropTypes.shape({
    resetError: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetRoute);
