import React from 'react';
import {Form} from 'formik';
import {PropTypes} from 'prop-types';

import Overview from './Service/Overview';
import Hours from './LocationForm/Hours';
import Detail from './Service/Detail';
import CheckboxGroup from './Service/CheckboxGroup';
import Keywords from './Service/Keywords';
import DangerZone from './LocationForm/DangerZone';

const ServiceForm = props => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
    checkboxes,
  } = props;
  const shared = {
    errors,
    touched,
    handleBlur,
    handleChange,
    values,
  };
  const findCheckbox = id => {
    return checkboxes.find(checkbox => checkbox.id === id);
  };
  const Categories = findCheckbox(1);
  const BusinessType = findCheckbox(141);
  const BusinessStage = findCheckbox(145);
  const UnderservedCommunities = findCheckbox(150);
  const Industry = findCheckbox(161);

  return (
    <Form className="profile-form" onSubmit={handleSubmit}>
      <Overview {...shared} />
      <Hours {...shared} />
      <Detail {...shared} />
      <CheckboxGroup
        {...shared}
        data={{...Categories}}
        group={`${Categories.id}`}
        title="Service Categories"
        md={6}
      />
      <CheckboxGroup
        {...shared}
        data={{...BusinessType}}
        group={`${BusinessType.id}`}
        title="Business Type"
      />
      <CheckboxGroup
        {...shared}
        data={{...BusinessStage}}
        group={`${BusinessStage.id}`}
        title="Business Stage"
      />
      <CheckboxGroup
        {...shared}
        data={{...UnderservedCommunities}}
        group={`${UnderservedCommunities.id}`}
        title="Underserved Communities"
        md={6}
      />
      <CheckboxGroup
        {...shared}
        data={{...Industry}}
        group={`${Industry.id}`}
        title="Industry"
        md={6}
      />
      <Keywords {...shared} />
      <DangerZone name="service" />
    </Form>
  );
};

ServiceForm.propTypes = {
  checkboxes: PropTypes.arrayOf(PropTypes.shape({})),
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
