import React, {PureComponent} from 'react';
import {Formik} from 'formik';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PasswordRecoveryForm from './PasswordRecoveryForm';

import * as user from '@Actions/user';
import * as snackbarActions from '@Actions/snackbar';

const PasswordRecoverySchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password is too short (minimum is 8 characters)')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Password don't match")
    .min(8, 'Password is too short (minimum is 8 characters)')
    .required('Required'),
});

const initialValues = {password: '', confirmPassword: ''};

class PasswordRecoveryContainer extends PureComponent {
  componentDidUpdate(prevProps) {
    const {error, snackbar, router, success} = this.props;

    if (error !== prevProps.error) {
      if (error) {
        snackbar.showSnackbar({
          message: 'An error has ocurred',
        });
      }
    }

    if (success !== prevProps.success) {
      if (success) {
        snackbar.showSnackbar({
          message: 'Password changes, please login',
        });
        router.push('/admin-login');
      }
    }
  }

  render() {
    const {userActions, location} = this.props;

    return (
      <Grid item={true} xs={12} md={5}>
        <Formik
          render={_props => <PasswordRecoveryForm {..._props} />}
          initialValues={initialValues}
          validationSchema={PasswordRecoverySchema}
          onSubmit={(values, {setSubmitting}) => {
            userActions
              .passwordReset(
                location.query['reset_password_token'],
                values.password,
                values.confirmPassword
              )
              .then(() => {
                setSubmitting(true);
              });
          }}
        />
      </Grid>
    );
  }
}

const mapStateToProps = _state => {
  return {
    error: _state.user.error,
    emailSent: _state.user.emailReset !== '',
    success: _state.user.passwordResetSuccess,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    userActions: bindActionCreators(user, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
  };
};

PasswordRecoveryContainer.propTypes = {
  emailSent: PropTypes.bool,
  error: PropTypes.bool,
  location: PropTypes.shape({
    query: PropTypes.shape({}),
  }),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
  success: PropTypes.bool,
  userActions: PropTypes.shape({
    passwordReset: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PasswordRecoveryContainer));
