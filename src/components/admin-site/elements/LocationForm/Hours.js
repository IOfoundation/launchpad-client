import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import Item from './Hours/Item';

import {sharedStyles, sharedClasses} from './styles';

const Hours = props => {
  const {values, classes, handleChange, errors, handleBlur} = props;

  return (
    <div className={classes.card}>
      <div className={classes.cardTitle}>
        <span className={`${classes.cardTitle}__media`}>
          {'Hours of Operation'}
        </span>
      </div>
      <div className={classes.cardContent}>
        <Item
          handleBlur={handleBlur}
          handleChange={handleChange}
          errors={errors}
          field="hoursRegular"
          formValue={values.hoursRegular}
          titleLabel="Regular Hours"
          buttonLabel="Add Hours of Operation"
        />
        <Item
          handleBlur={handleBlur}
          handleChange={handleChange}
          errors={errors}
          field="hoursHolidays"
          formValue={values.hoursHolidays}
          titleLabel="Holiday Hours"
          buttonLabel="Add Hours of Operation"
        />
      </div>
    </div>
  );
};

Hours.propTypes = {
  classes: sharedClasses,
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(sharedStyles)(Hours);
