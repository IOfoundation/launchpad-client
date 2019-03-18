import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import FormTextField from '../../../shared/FormElements/TextFieldDefault';
import Checkbox from '../../../shared/FormElements/Checkbox';

import {sharedStyles, sharedClasses} from './styles';

export const Overview = props => {
  const {errors, touched, handleBlur, handleChange, values, classes} = props;

  return (
    <div className="m-bot-8" style={{padding: 8}}>
      <h2 className={classes.title}>{'Overview'}</h2>
      <Checkbox
        label="Check if this is the main location"
        name="isMainLocation"
        onChange={handleChange}
        value={values.isMainLocation}
      />
      <Grid container={true} spacing={16}>
        <Grid item={true} xs={12} md={6}>
          <FormTextField
            autocomplete="off"
            error={touched.locationName && Boolean(errors.locationName)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id="locationName"
            name="locationName"
            label="Location Name"
            value={values.locationName}
          />
        </Grid>

        <Grid item={true} xs={12} md={6}>
          <FormTextField
            autocomplete={'off'}
            error={touched.alternateName && Boolean(errors.alternateName)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            helperText="This is how the name will appear to other users."
            id={'alternateName'}
            label={'Alternate Name'}
            value={values.alternateName}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <FormTextField
            autocomplete={'off'}
            error={
              touched.locationDescription && Boolean(errors.locationDescription)
            }
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            helperText="A description of the location's services."
            id={'locationDescription'}
            label={'Location Description'}
            multiline={true}
            value={values.locationDescription}
          />
        </Grid>
      </Grid>
    </div>
  );
};

Overview.propTypes = {
  classes: sharedClasses,
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(sharedStyles)(Overview);
