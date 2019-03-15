import React, {PureComponent} from 'react';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {Formik} from 'formik';

import SingInForm from './SignInForm';

import * as user from 'Actions/user';
import * as snackbarActions from 'Actions/snackbar';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string().required('Required'),
});

const initialValues = {email: '', password: ''};

class SignInFormContainer extends PureComponent {
  componentDidUpdate(prevProps) {
    const {error, isAuth, snackbar, router} = this.props;

    if (error !== prevProps.error || isAuth !== prevProps.isAuth) {
      if (error) {
        snackbar.showSnackbar({
          message: 'Login Error',
        });
      } else if (isAuth) {
        snackbar.showSnackbar({
          message: 'Login Successful',
        });
        router.push('/admin/profile');
      }
    }
  }

  render() {
    const {userActions} = this.props;

    return (
      <Grid item={true} xs={12} md={5}>
        <Formik
          render={_props => <SingInForm {..._props} />}
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values, {setSubmitting}) => {
            userActions
              .login({
                email: values.email,
                password: values.password,
              })
              .then(() => {
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
    isAuth: _state.user.authorization !== '',
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    userActions: bindActionCreators(user, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
  };
};

SignInFormContainer.propTypes = {
  error: PropTypes.bool,
  isAuth: PropTypes.bool,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
  userActions: PropTypes.shape({
    login: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignInFormContainer));
