import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {sharedStyles, sharedClasses} from './styles';
import Grid from '@material-ui/core/Grid';

import FormTextField from '../../../shared/FormElements/TextFieldDefault';

const Transportation = props => {
  const {values, classes, handleChange, handleBlur, errors} = props;

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
              label={
                'What public transportation options are nearby? (Bus stops, train stations, etc.)'
              }
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
  classes: sharedClasses,
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(sharedStyles)(Transportation);
