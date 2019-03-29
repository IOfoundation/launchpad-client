import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {isEqual} from 'lodash';

import SignUpForm from './SignUpForm';

import * as user from '@Actions/user';
import * as snackbarActions from '@Actions/snackbar';

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
    const {errorsModel, signUpSuccessfully, snackbar, router} = this.props;
    const differentErrors = !isEqual(errorsModel, prevProps.errorsModel);

    if (differentErrors) {
      const errorKeys = Object.keys(errorsModel.errors);

      if (errorKeys.length > 0) {
        const parsedError = errorKeys.map(
          key => `${errorsModel.model} ${key} ${errorsModel.errors[key][0]}`
        );

        snackbar.showSnackbar({
          message: parsedError[0],
        });
      }
    }

    if (signUpSuccessfully !== prevProps.signUpSuccessfully) {
      snackbar.showSnackbar({
        message: 'Sign Up Successful',
      });

      router.push('/admin-login/account-requested');
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
    errorsModel: _state.user.singUpErrors,
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
  errorsModel: PropTypes.shape({
    model: PropTypes.string,
    errors: PropTypes.shape({
      description: PropTypes.arrayOf(PropTypes.string),
      email: PropTypes.arrayOf(PropTypes.string),
      name: PropTypes.arrayOf(PropTypes.string),
      password: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignUpFormContainer));
