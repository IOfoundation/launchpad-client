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
import Transportation from './LocationForm/Transportation';
import Accessibility from './LocationForm/Accessibility';
import DangerZone from './LocationForm/DangerZone';
import Hours from './LocationForm/Hours';

const LocationForm = props => {
  const {
    breakpoint,
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
    <Form className="location-form" onSubmit={handleSubmit}>
      <Overview {...shared} />
      <Details {...shared} />
      <Services {...shared} />
      <StreetAddress {...shared} />
      <MailingAddress {...shared} />
      <Phones {...shared} />
      <Languages {...shared} />
      <Hours {...shared} />
      <Transportation {...shared} breakpoint={breakpoint} />
      <Accessibility {...shared} />
      <DangerZone />
    </Form>
  );
};

LocationForm.propTypes = {
  breakpoint: PropTypes.string,
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
    locationName: PropTypes.string,
    alternateName: PropTypes.string,
    locationDescription: PropTypes.string,
    locationEmail: PropTypes.string,
    locationWebsite: PropTypes.string,
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
