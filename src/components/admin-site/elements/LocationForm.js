import React from 'react';
import {Form} from 'formik';
import {PropTypes} from 'prop-types';

import Overview from './LocationForm/Overview';
import Details from './LocationForm/Details';
import Services from './LocationForm/Services';
import Phones from './LocationForm/Phones';
import StreetAddress from './LocationForm/StreetAddress';
import MailingAddress from './LocationForm/MailingAddress';
import Languages from './LocationForm/Languages';

const LocationForm = props => {
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
      <Details {...shared} />
      <Services {...shared} />
      <Phones {...shared} />
      <StreetAddress {...shared} />
      <MailingAddress {...shared} />
      <Languages {...shared} />
    </Form>
  );
};

LocationForm.propTypes = {
  classes: PropTypes.shape({
    btn: PropTypes.string,
    btnWrapper: PropTypes.string,
    bottomLine: PropTypes.string,
    card: PropTypes.string,
    cardContent: PropTypes.string,
    cardTitle: PropTypes.string,
    containerFlex: PropTypes.string,
    phoneItem: PropTypes.string,
    phoneItemWrapper: PropTypes.string,
    sectionOnePhotoElement: PropTypes.string,
    sectionOnePhotoPhoto: PropTypes.string,
  }),
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
    password: PropTypes.bool,
    contactEmail: PropTypes.bool,
    organizationName: PropTypes.bool,
    name: PropTypes.bool,
    website: PropTypes.bool,
    description: PropTypes.bool,
    accreditations: PropTypes.bool,
    dateIncorporation: PropTypes.bool,
    legalStatus: PropTypes.bool,
    fundingSources: PropTypes.bool,
    licenses: PropTypes.bool,
    taxIdentifier: PropTypes.bool,
    taxStatus: PropTypes.bool,
    twitter: PropTypes.bool,
    facebook: PropTypes.bool,
    linkedin: PropTypes.bool,
    phoneNumber: PropTypes.bool,
    ext: PropTypes.bool,
    vanityNumber: PropTypes.bool,
    numberType: PropTypes.bool,
    department: PropTypes.bool,
    countryExt: PropTypes.bool,
  }),
  values: PropTypes.shape({
    password: PropTypes.string,
    contactEmail: PropTypes.string,
    organizationName: PropTypes.string,
    name: PropTypes.string,
    website: PropTypes.string,
    description: PropTypes.string,
    accreditations: PropTypes.string,
    dateIncorporation: PropTypes.string,
    legalStatus: PropTypes.string,
    fundingSources: PropTypes.string,
    licenses: PropTypes.string,
    taxIdentifier: PropTypes.string,
    taxStatus: PropTypes.string,
    twitter: PropTypes.string,
    facebook: PropTypes.string,
    linkedin: PropTypes.string,
    phoneNumber: PropTypes.string,
    ext: PropTypes.string,
    vanityNumber: PropTypes.string,
    numberType: PropTypes.string,
    department: PropTypes.string,
    countryExt: PropTypes.string,
  }),
};

export default LocationForm;
