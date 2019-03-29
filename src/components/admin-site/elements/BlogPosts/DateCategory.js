import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import SelectElement from '@Shared/FormElements/Select';

export const DateCategory = props => {
  const {errors, handleBlur, handleChange, values, classes} = props;

  return (
    <div className="m-bot-8" style={{padding: 8}}>
      <Grid container={true} spacing={16} alignItems="center">
        <Grid item={true} xs={12} md={8} className={classes.date}>
          {'Started, November 11, 2018'}
        </Grid>
        <Grid item={true} xs={12} md={4}>
          <SelectElement
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'category'}
            label={'Category Title'}
            name={'category'}
            value={values.category}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const styles = () => {
  return {
    date: {
      color: '#7B7C7E',
    },
  };
};

DateCategory.propTypes = {
  classes: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(styles)(DateCategory);
