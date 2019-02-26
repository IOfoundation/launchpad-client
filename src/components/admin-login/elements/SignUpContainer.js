import React from 'react';
import SignUpForm from './SignUpForm';
import {Formik} from 'formik';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  resource: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string().required('Required'),
});

const initialValues = {
  email: '',
  password: '',
  name: '',
  resource: '',
  description: '',
};

const SignUpFormContainer = () => {
  return (
    <Grid item={true} xs={12} md={5}>
      <Formik
        render={props => <SignUpForm {...props} />}
        initialValues={initialValues}
        validationSchema={SignUpSchema}
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

export default SignUpFormContainer;
