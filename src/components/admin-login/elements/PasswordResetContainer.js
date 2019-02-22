import React from 'react';
import PasswordResetForm from './PasswordResetForm';
import {Formik} from 'formik';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';

import * as user from '../../../actions/user';
import * as snackbarActions from '../../../actions/snackbar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
});

const initialValues = {email: ''};

const PasswordResetContainer = props => {
  const {error, emailSent} = props;

  if (error) {
    props.snackbar.showSnackbar({
      message: 'An error has occurred',
    });
  } else if (emailSent) {
    props.snackbar.showSnackbar({
      message: 'Email Sent',
    });
  }

  return (
    <Grid item={true} xs={12} md={5}>
      <Formik
        render={_props => <PasswordResetForm {..._props} />}
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, {setSubmitting}) => {
          props.user.passwordRecovery({email: values.email}).then(() => {
            setSubmitting(false);
          });
        }}
        validateOnChange={false}
      />
    </Grid>
  );
};

const mapStateToProps = _state => {
  return {
    error: _state.user.error,
    emailSent: _state.user.emailReset !== '',
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    user: bindActionCreators(user, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
  };
};

PasswordResetContainer.propTypes = {
  emailSent: PropTypes.bool,
  error: PropTypes.bool,
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
  user: PropTypes.shape({
    passwordRecovery: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetContainer);
