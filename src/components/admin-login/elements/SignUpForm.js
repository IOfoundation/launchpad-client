import React from 'react';
import {Form} from 'formik';
import {PropTypes} from 'prop-types';

import FormTextField from 'Shared/FormElements/TextField';

const SingUpForm = props => {
  const {
    values: {email, password, name, resource, description},
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
        error={touched.name && Boolean(errors.name)}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        id="name"
        label="Your Full Name"
        value={name}
      />
      <FormTextField
        error={touched.resource && Boolean(errors.resource)}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        id="resource"
        label="Business/Resource Name"
        value={resource}
      />
      <FormTextField
        error={touched.description && Boolean(errors.description)}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        id="description"
        label="Description"
        multiline={true}
        value={description}
        marginBottom={true}
      />
      <FormTextField
        autocomplete="username email"
        error={touched.email && Boolean(errors.email)}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        id="email"
        label="Your Email Address"
        value={email}
      />
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
      <button
        className="btn btn__submit"
        type="submit"
        disabled={!isValid || isSubmitting}
      >
        {'Create Account'}
      </button>
    </Form>
  );
};

SingUpForm.propTypes = {
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

export default SingUpForm;
