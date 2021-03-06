import React from 'react';
import {Form} from 'formik';
import {PropTypes} from 'prop-types';

import Basic from './Account/Basic';
import ChangePassword from './Account/ChangePassword';
import CancelAccount from './Account/CancelAccount';

const ProfileForm = props => {
  const {
    closeClicked,
    errors,
    handleBlur,
    handleChange,
    touched,
    values,
  } = props;
  const shared = {
    errors,
    handleBlur,
    handleChange,
    touched,
    values,
  };

  return (
    <Form className="profile-form">
      <Basic {...shared} />
      <ChangePassword {...shared} />
      <CancelAccount closeClicked={closeClicked} />
    </Form>
  );
};

ProfileForm.propTypes = {
  closeClicked: PropTypes.func,
  errors: PropTypes.shape({
    fullName: PropTypes.string,
    contactEmail: PropTypes.string,
    currentPassword: PropTypes.string,
    newPassword: PropTypes.string,
    confirmPassword: PropTypes.string,
  }),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  touched: PropTypes.shape({
    fullName: PropTypes.bool,
    contactEmail: PropTypes.bool,
    currentPassword: PropTypes.bool,
    newPassword: PropTypes.bool,
    confirmPassword: PropTypes.bool,
  }),
  values: PropTypes.shape({
    fullName: PropTypes.string,
    contactEmail: PropTypes.string,
    currentPassword: PropTypes.string,
    newPassword: PropTypes.string,
    confirmPassword: PropTypes.string,
  }),
};

export default ProfileForm;
