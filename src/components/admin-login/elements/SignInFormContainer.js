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
import SnackbarUI from '../../shared/SnackBar';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string().required('Required'),
});

const initialValues = {email: '', password: ''};

const SignInFormContainer = props => {
  return (
    <Grid item={true} xs={12} md={5}>
      <SnackbarUI />
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
              props.snackbar.testingSnackbar({
                message: 'Login Successful',
              });
            });
        }}
        validateOnChange={false}
      />
    </Grid>
  );
};

const mapDispatchToProps = _dispatch => {
  return {
    user: bindActionCreators(user, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
  };
};

SignInFormContainer.propTypes = {
  snackbar: PropTypes.shape({
    testingSnackbar: PropTypes.func,
  }),
  user: PropTypes.shape({
    login: PropTypes.func,
  }),
};

export default connect(
  null,
  mapDispatchToProps
)(SignInFormContainer);
