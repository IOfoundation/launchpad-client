import React from 'react';
import {PropTypes} from 'prop-types';
import Grid from '@material-ui/core/Grid';

import FormTextField from '@Shared/FormElements/TextFieldDefault';

export const Basic = props => {
  const {errors, touched, handleBlur, handleChange, values} = props;

  return (
    <div className="m-bot-40">
      <Grid container={true}>
        <Grid item={true} xs={8}>
          <FormTextField
            autocomplete="off"
            error={touched.fullName && Boolean(errors.fullName)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'fullName'}
            label={'Your Full Name'}
            value={values.fullName}
          />
        </Grid>
        <Grid item={true} xs={8}>
          <FormTextField
            autocomplete="off"
            error={touched.emailAddress && Boolean(errors.emailAddress)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'emailAddress'}
            label={'Email Address'}
            value={values.emailAddress}
          />
        </Grid>
      </Grid>
    </div>
  );
};

Basic.propTypes = {
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default Basic;
