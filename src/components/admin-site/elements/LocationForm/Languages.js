import React, {Fragment} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {FieldArray} from 'formik';

import AddNew from './Languages/AddNew';
import Item from './Languages/Item';

import {sharedStyles, sharedClasses} from './styles';

const Languages = props => {
  const {values, classes, handleChange, errors} = props;

  return (
    <div className={classes.card}>
      <div className={classes.cardTitle}>
        <span className={`${classes.cardTitle}__media`}>
          {'Languages Spoken at Location'}
        </span>
      </div>
      <div className={classes.cardContent}>
        <FieldArray
          name="languages"
          render={arrayHelpers => (
            <Fragment>
              {values.languages && values.languages.length > 0 ? (
                <Fragment>
                  {values.languages.map((language, index) => {
                    return (
                      <Item
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        id={index}
                        language={language}
                        arrayHelpers={arrayHelpers}
                      />
                    );
                  })}
                  <AddNew
                    arrayHelpers={arrayHelpers}
                    handleChange={handleChange}
                  />
                </Fragment>
              ) : (
                <AddNew
                  errors={errors}
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

Languages.propTypes = {
  classes: sharedClasses,
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(sharedStyles)(Languages);
