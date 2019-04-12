import React from 'react';
import Grid from '@material-ui/core/Grid';
import {PropTypes} from 'prop-types';

import FormTextField from '@Shared/FormElements/TextFieldDefault';

const Licenses = props => {
  const {touched, errors, handleBlur, handleChange, values} = props;

  return (
    <Grid container={true} spacing={16}>
      <Grid item={true} xs={12}>
        <FormTextField
          key="licenses"
          error={touched.licenses && Boolean(errors.licenses)}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          id="licenses"
          label="Licenses"
          autocomplete="off"
          value={values.licenses}
          type="text"
          helperText="You can enter multiple terms in this box by pressing the comma key after each one."
        />
      </Grid>
      <Grid item={true} xs={12}>
        <FormTextField
          key="taxIdentifier"
          error={touched.taxIdentifier && Boolean(errors.taxIdentifier)}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          id="taxIdentifier"
          label="Tax Identifier"
          autocomplete="off"
          value={values.taxIdentifier}
          type="text"
          helperText="Tax identifier such as the Federal Employer Identification Number."
        />
      </Grid>
      <Grid item={true} xs={12}>
        <FormTextField
          key="taxStatus"
          error={touched.taxStatus && Boolean(errors.taxStatus)}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          id="taxStatus"
          label="Tax Status"
          autocomplete="off"
          value={values.taxStatus}
          type="text"
          helperText="Internal Revenue Service tax designation, such as 501(c)(3)."
        />
      </Grid>
    </Grid>
  );
};

Licenses.propTypes = {
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default Licenses;
