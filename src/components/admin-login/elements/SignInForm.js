import React from 'react';
import {Form} from 'formik';
import {Link} from 'react-router';
import {PropTypes} from 'prop-types';

import FormTextField from '@Shared/FormElements/TextField';

const SingInForm = props => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    touched,
    values: {email, password},
  } = props;

  return (
    <Form className="admin-login-form" onSubmit={handleSubmit}>
      <FormTextField
        error={touched.email && Boolean(errors.email)}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        id="email"
        label="Email Address"
        autocomplete="username email"
        value={email}
      />
      <FormTextField
        error={touched.password && Boolean(errors.password)}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        id="password"
        label="Password"
        type="password"
        autocomplete="current-password"
        value={password}
      />
      <button
        className="btn btn__submit"
        type="submit"
        disabled={!isValid || isSubmitting}
      >
        {'Sign In'}
      </button>
      <Link
        className="btn__password text-thin"
        to="/admin-login/password-reset"
      >
        {'Forgot your password?'}
      </Link>
    </Form>
  );
};

SingInForm.propTypes = {
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  touched: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool,
  }),
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
};

export default SingInForm;
