import React from 'react';
import SingInForm from './SignInForm';
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
  password: Yup.string().required('Required'),
});

const initialValues = {email: '', password: ''};

const SignInFormContainer = props => {
  const {error, isAuth} = props;

  if (error) {
    props.snackbar.showSnackbar({
      message: 'Login Error',
    });
  } else if (isAuth) {
    props.snackbar.showSnackbar({
      message: 'Login Successful',
    });
  }

  return (
    <Grid item={true} xs={12} md={5}>
      <Formik
        render={_props => <SingInForm {..._props} />}
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, {setSubmitting}) => {
          props.user
            .login({
              email: values.email,
              password: values.password,
            })
            .then(() => {
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
    isAuth: _state.user.authorization !== '',
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    user: bindActionCreators(user, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
  };
};

SignInFormContainer.propTypes = {
  error: PropTypes.bool,
  isAuth: PropTypes.bool,
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
  user: PropTypes.shape({
    login: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInFormContainer);
