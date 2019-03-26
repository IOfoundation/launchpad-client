import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import FormTextField from '../../../shared/FormElements/TextFieldDefault';

import {sharedStyles, sharedClasses} from './styles';

export const Details = props => {
  const {errors, touched, handleBlur, handleChange, values, classes} = props;

  return (
    <div className="m-bot-28" style={{padding: 8}}>
      <h2 className={classes.title}>{'Details'}</h2>
      <Grid container={true} spacing={16}>
        <Grid item={true} xs={12} md={6}>
          <FormTextField
            autocomplete={'off'}
            error={touched.locationEmail && Boolean(errors.locationEmail)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'locationEmail'}
            label={'Location Email Address'}
            value={values.locationEmail}
            helperText="The location's general email."
          />
        </Grid>
        <Grid item={true} xs={12} md={6}>
          <FormTextField
            autocomplete={'off'}
            error={touched.locationWebsite && Boolean(errors.locationWebsite)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'locationWebsite'}
            label={'Location Website'}
            value={values.locationWebsite}
          />
        </Grid>
      </Grid>
    </div>
  );
};

Details.propTypes = {
  classes: sharedClasses,
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(sharedStyles)(Details);
