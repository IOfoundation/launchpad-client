import React from 'react';
import {Form} from 'formik';
import {Link} from 'react-router';
import {PropTypes} from 'prop-types';
import FormTextField from '../../shared/FormElements/TextField';

const SingInForm = props => {
  const {
    values: {email, password},
    errors,
    touched,
    handleSubmit,
    isValid,
    handleBlur,
    handleChange,
    isSubmitting,
  } = props;

  return (
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
      <FormTextField
        id="password"
        value={password}
        label="Password"
        error={touched.password && Boolean(errors.password)}
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
    email: PropTypes.shape({}),
    password: PropTypes.shape({}),
  }),
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
};

export default SingInForm;
