import React from 'react';
import SingInForm from './SignInForm';
import {Formik} from 'formik';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';

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
      <Formik
        render={props => <SingInForm {...props} />}
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
        validateOnChange={false}
      />
    </Grid>
  );
};

export default SignInFormContainer;
