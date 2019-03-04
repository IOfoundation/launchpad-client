import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Yup from 'yup';
import * as user from '../../../actions/user';
import * as snackbarActions from '../../../actions/snackbar';
import {Formik} from 'formik';

import SignUpForm from './SignUpForm';
import Grid from '@material-ui/core/Grid';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  resource: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short (minimum is 8 characters)')
    .required('Required'),
});

const initialValues = {
  email: '',
  password: '',
  name: '',
  resource: '',
  description: '',
};

class SignUpFormContainer extends PureComponent {
  componentDidUpdate(prevProps) {
    const {errors, signUpSuccessfully, snackbar, router} = this.props;

    if (
      errors !== prevProps.errors ||
      signUpSuccessfully !== prevProps.signUpSuccessfully
    ) {
      if (errors && errors.length > 0) {
        const parsedError = Object.keys(errors[0].detail).map(
          key => `${key} ${errors[0].detail[key][0]}`
        );
        snackbar.showSnackbar({
          message: parsedError[0],
        });
      } else if (signUpSuccessfully) {
        snackbar.showSnackbar({
          message: 'Sign Up Successful',
        });

        router.push('/admin-login/account-requested');
      } else if (!errors) {
        snackbar.showSnackbar({
          message: 'Sign Up Error',
        });
      }
    }
  }

  render() {
    const {userActions} = this.props;

    return (
      <Grid item={true} xs={12} md={5}>
        <Formik
          render={props => <SignUpForm {...props} />}
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={(values, {setSubmitting}) => {
            userActions
              .singUp({
                password: values.password,
                email: values.email,
                name: values.name,
                organization_name: values.resource,
                organization_description: values.description,
              })
              .then(() => {
                setSubmitting(false);
              });
          }}
          validateOnChange={false}
        />
      </Grid>
    );
  }
}

const mapStateToProps = _state => {
  return {
    errors: _state.user.singUpErros,
    signUpSuccessfully: _state.user.signUpSuccessfully,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    userActions: bindActionCreators(user, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
  };
};

SignUpFormContainer.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({})),
  isAuth: PropTypes.bool,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  signUpSuccessfully: PropTypes.bool,
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
  userActions: PropTypes.shape({
    login: PropTypes.func,
  }),
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUpFormContainer)
);
