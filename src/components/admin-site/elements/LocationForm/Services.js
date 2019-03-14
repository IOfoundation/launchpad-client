import React, {Fragment} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {sharedStyles, sharedClasses} from './styles';
import {FieldArray} from 'formik';

import AddNewService from './Services/AddNewService';
import Item from './Services/Item';

const Services = props => {
  const {values, classes, handleChange} = props;

  return (
    <div className={classes.card}>
      <div className={classes.cardTitle}>
        <span className={`${classes.cardTitle}__media`}>
          {'Services at this Location'}
        </span>
      </div>
      <div className={classes.cardContent}>
        <FieldArray
          name="services"
          render={arrayHelpers => (
            <Fragment>
              {values.services && values.services.length > 0 ? (
                <Fragment>
                  {values.services.map((service, index) => {
                    return (
                      <Item
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        id={index}
                        service={service}
                        arrayHelpers={arrayHelpers}
                      />
                    );
                  })}
                  <AddNewService
                    arrayHelpers={arrayHelpers}
                    handleChange={handleChange}
                  />
                </Fragment>
              ) : (
                <AddNewService
                  arrayHelpers={arrayHelpers}
                  handleChange={handleChange}
                />
              )}
            </Fragment>
          )}
        />
      </div>
    </div>
  );
};

Services.propTypes = {
  classes: sharedClasses,
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(sharedStyles)(Services);
