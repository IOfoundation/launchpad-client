import React, {Fragment} from 'react';
import {Form} from 'formik';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';
import FormTextField from '../../shared/FormElements/TextField';

const styles = () => {
  return {
    text: {
      fontSize: '16px',
      lineHeight: '24px',
      margin: '0 5em 24px 0',
    },
  };
};

const PasswordResetForm = props => {
  const {
    values: {email},
    errors,
    touched,
    handleSubmit,
    isValid,
    handleBlur,
    handleChange,
    isSubmitting,
    classes,
  } = props;

  return (
    <Fragment>
      <p className={classes.text}>
        {
          "Please enter your email address. We'll email you a link to reset your password."
        }
      </p>
      <Form className="admin-login-form" onSubmit={handleSubmit}>
        <FormTextField
          id="email"
          value={email}
          label="Email Address"
          error={touched.email && Boolean(errors.email)}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        <button
          className="btn btn__submit"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {'Submit'}
        </button>
      </Form>
    </Fragment>
  );
};

PasswordResetForm.propTypes = {
  classes: PropTypes.shape({
    text: PropTypes.string,
  }),
  errors: PropTypes.shape({
    email: PropTypes.string,
  }),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  touched: PropTypes.shape({
    email: PropTypes.bool,
  }),
  values: PropTypes.shape({
    email: PropTypes.string,
  }),
};

export default withStyles(styles)(PasswordResetForm);
