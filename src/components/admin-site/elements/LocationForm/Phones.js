import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import {sharedStyles, sharedClasses} from './styles';
import PhonesElements from './PhonesElements';

const Phones = props => {
  const {classes, touched, errors, handleChange, handleBlur, values} = props;

  return (
    <div className={classes.card}>
      <div className={classes.cardTitle}>
        <span className={`${classes.cardTitle}__media`}>{'Phone Numbers'}</span>
        <span className={`${classes.cardTitle}__small`}>
          {
            'If the phone number belongs to a contact, please move it to the existing contact, or add a new contact.'
          }
        </span>
      </div>
      <div className={classes.cardContent} style={{padding: 8}}>
        <PhonesElements
          handleBlur={handleBlur}
          handleChange={handleChange}
          values={values}
          touched={touched}
          errors={errors}
        />
      </div>
    </div>
  );
};

Phones.propTypes = {
  arrayHelpers: PropTypes.shape({}),
  classes: sharedClasses,
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(sharedStyles)(Phones);
