import React from 'react';
import PasswordResetForm from './PasswordResetForm';
import {Formik} from 'formik';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
});

const initialValues = {email: ''};

const PasswordResetContainer = () => {
  return (
    <Grid item={true} xs={12} md={5}>
      <Formik
        render={_props => <PasswordResetForm {..._props} />}
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

export default PasswordResetContainer;
