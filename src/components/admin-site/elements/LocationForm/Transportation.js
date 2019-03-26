import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import FormTextField from '@Shared/FormElements/TextFieldDefault';

import {sharedStyles, sharedClasses} from './styles';

const Transportation = props => {
  const {values, classes, handleChange, handleBlur, errors, breakpoint} = props;
  let label =
    'What public transportation options are nearby? (Bus stops, train stations, etc.)';

  if (breakpoint === 'xs') {
    label = 'List public transportation options';
  }

  return (
    <div className={classes.card}>
      <div className={classes.cardTitle}>
        <span className={`${classes.cardTitle}__media`}>
          {'Transportation Options'}
        </span>
      </div>
      <div className={classes.cardContent}>
        <Grid container={true} spacing={16}>
          <Grid item={true} xs={12}>
            <FormTextField
              autocomplete={'off'}
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              name={'transportation'}
              id={'transportation'}
              label={label}
              value={values.transportation}
              values={values}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

Transportation.propTypes = {
  breakpoint: PropTypes.string,
  classes: sharedClasses,
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(sharedStyles)(Transportation);
