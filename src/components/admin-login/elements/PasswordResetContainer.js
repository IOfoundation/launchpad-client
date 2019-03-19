import React, {PureComponent} from 'react';
import {Formik} from 'formik';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PasswordResetForm from './PasswordResetForm';

import * as user from '@Actions/user';
import * as snackbarActions from '@Actions/snackbar';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
});

const initialValues = {email: ''};

class PasswordResetContainer extends PureComponent {
  componentDidUpdate(prevProps) {
    const {error, emailSent, snackbar, router} = this.props;

    if (error !== prevProps.error || emailSent !== prevProps.emailSent) {
      if (error) {
        snackbar.showSnackbar({
          message: 'An error has ocurred',
        });
      } else if (emailSent) {
        router.push('/admin-login/password-reset-confirmation');
      }
    }
  }

  render() {
    const {userActions} = this.props;

    return (
      <Grid item={true} xs={12} md={5}>
        <Formik
          render={_props => <PasswordResetForm {..._props} />}
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values, {setSubmitting}) => {
            userActions.passwordRecovery({email: values.email}).then(() => {
              setSubmitting(false);
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
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    userActions: bindActionCreators(user, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
  };
};

PasswordResetContainer.propTypes = {
  emailSent: PropTypes.bool,
  error: PropTypes.bool,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
  userActions: PropTypes.shape({
    passwordRecovery: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PasswordResetContainer));
