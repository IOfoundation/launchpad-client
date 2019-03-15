import React from 'react';
import {Form} from 'formik';
import {PropTypes} from 'prop-types';
import Overview from './Service/Overview';
import Hours from './LocationForm/Hours';
import Detail from './Service/Detail';
import CheckboxGroup from './Service/CheckboxGroup';
import Keywords from './Service/Keywords';
import DangerZone from './LocationForm/DangerZone';
import {Categories} from './Service/Categories';
import {BusinessType} from './Service/BusinessType';
import {BusinessStage} from './Service/BusinessStage';
import {UnderservedCommunities} from './Service/UnderservedCommunities';
import {Industry} from './Service/Industry';
import Buttons from '../Buttons';

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
      <Hours {...shared} />
      <Detail {...shared} />
      <CheckboxGroup
        {...shared}
        data={{...Categories}}
        group="serviceCategories"
        title="Service Categories"
        md={6}
      />
      <CheckboxGroup
        {...shared}
        data={{...BusinessType}}
        group="businessType"
        title="Business Type"
      />
      <CheckboxGroup
        {...shared}
        data={{...BusinessStage}}
        group="businessStage"
        title="Business Stage"
      />
      <CheckboxGroup
        {...shared}
        data={{...UnderservedCommunities}}
        group="underservedCommunities"
        title="Underserved Communities"
        md={6}
      />
      <CheckboxGroup
        {...shared}
        data={{...Industry}}
        group="industry"
        title="Industry"
        md={6}
      />
      <Keywords {...shared} />
      <DangerZone />
      <Buttons />
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
