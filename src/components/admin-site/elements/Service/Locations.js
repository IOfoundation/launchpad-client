/*import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {sharedStyles, sharedClasses} from '../LocationForm/styles';
import Grid from '@material-ui/core/Grid';
import SelectElement from '@Shared/FormElements/Select';

export const Locations = props => {
  const {errors, touched, handleBlur, handleChange, values, classes} = props;

  return (
    <Grid container={true} spacing={16} className="m-bot-40">
      <Grid item={true} xs={12}>
        <SelectElement
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          id={'locationId'}
          label={'Location'}
          name={'locationId'}
          value={values.locationId}
          helperText={'Please select a location'}
        />
      </Grid>
    </Grid>
  );
};

Locations.propTypes = {
  classes: sharedClasses,
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(sharedStyles)(Locations);*/
