import React, {Fragment} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {FieldArray} from 'formik';

import AddNewService from './Services/AddNewService';
import Item from './Services/Item';

import {sharedStyles, sharedClasses} from './styles';

const Services = props => {
  const {values, classes, handleChange, mode} = props;

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
                <Fragment>
                  {mode === 'new' && (
                    <p className={classes.content}>
                      {'Please create this Location before adding Services.'}
                    </p>
                  )}
                  <AddNewService
                    arrayHelpers={arrayHelpers}
                    handleChange={handleChange}
                    createServiceDisable={mode === 'new'}
                  />
                </Fragment>
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
  mode: PropTypes.string,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(sharedStyles)(Services);
