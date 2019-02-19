import React from 'react';
import SingInForm from './SignInForm';
import {Formik} from 'formik';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import SnackbarUI from '../../shared/SnackBar';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string().required('Required'),
});

const initialValues = {email: '', password: ''};

const SignInFormContainer = () => {
  return (
    <Grid item={true} xs={12} md={5}>
      <SnackbarUI />
      <Formik
        render={props => <SingInForm {...props} />}
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

export default SignInFormContainer;
