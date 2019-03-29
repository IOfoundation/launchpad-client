import React, {Fragment} from 'react';
import {Form} from 'formik';
import {PropTypes} from 'prop-types';

import FormTextField from '@Shared/FormElements/TextField';

const PasswordRecoveryForm = props => {
  const {
    values: {password, confirmPassword},
    errors,
    touched,
    handleSubmit,
    isValid,
    handleBlur,
    handleChange,
    isSubmitting,
  } = props;

  return (
    <Fragment>
      <Form className="admin-login-form" onSubmit={handleSubmit}>
        <FormTextField
          autocomplete="current-password"
          error={touched.password && Boolean(errors.password)}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          id="password"
          label="Password"
          type="password"
          value={password}
        />
        <FormTextField
          autocomplete="new-password"
          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
        />
        <button
          className="btn btn__submit"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {'Set Password'}
        </button>
      </Form>
    </Fragment>
  );
};

PasswordRecoveryForm.propTypes = {
  errors: PropTypes.shape({
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
  }),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  touched: PropTypes.shape({
    password: PropTypes.bool,
    confirmPassword: PropTypes.bool,
  }),
  values: PropTypes.shape({
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
  }),
};

export default PasswordRecoveryForm;
