import React from 'react';
import Grid from '@material-ui/core/Grid';
import {PropTypes} from 'prop-types';

import FormTextField from '@Shared/FormElements/TextFieldDefault';

const ThreeColumns = props => {
  const {touched, errors, handleBlur, handleChange, values} = props;

  return (
    <Grid container={true} spacing={16}>
      <Grid item={true} xs={4}>
        <FormTextField
          key="dateIncorporation"
          error={touched.dateIncorporation && Boolean(errors.dateIncorporation)}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          id="dateIncorporation"
          label="Date of Incorporation"
          autocomplete="off"
          value={values.dateIncorporation}
          type="date"
        />
      </Grid>
      <Grid item={true} xs={4}>
        <FormTextField
          key="legalStatus"
          error={touched.legalStatus && Boolean(errors.legalStatus)}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          id="legalStatus"
          label="Legal Status"
          autocomplete="off"
          value={values.legalStatus}
          type="text"
        />
      </Grid>
      <Grid item={true} xs={4}>
        <FormTextField
          key="fundingSources"
          error={touched.fundingSources && Boolean(errors.fundingSources)}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          id="fundingSources"
          label="Funding Sources"
          autocomplete="off"
          value={values.fundingSources}
          type="text"
        />
      </Grid>
    </Grid>
  );
};

ThreeColumns.propTypes = {
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default ThreeColumns;
