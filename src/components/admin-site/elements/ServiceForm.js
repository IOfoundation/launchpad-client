import React from 'react';
import {Form} from 'formik';
import {PropTypes} from 'prop-types';
import Overview from './Service/Overview';

const ServiceForm = props => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
  } = props;
  const shared = {
    errors,
    touched,
    handleBlur,
    handleChange,
    values,
  };

  return (
    <Form className="profile-form" onSubmit={handleSubmit}>
      <Overview {...shared} />
    </Form>
  );
};

ServiceForm.propTypes = {
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default ServiceForm;
