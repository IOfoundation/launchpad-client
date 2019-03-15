import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {sharedStyles} from '../LocationForm/styles';
import Grid from '@material-ui/core/Grid';
import {combineStyles} from '../../../../utils';

import FormTextField from '../../../shared/FormElements/TextFieldDefault';

const styles = () => {
  return {
    keywordAlert: {
      color: '#FF0048',
      fontSize: '14px',
      lineHeight: '20px',
    },
  };
};

const Keywords = props => {
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
            <p className={classes.keywordAlert}>
              {
                'The best way to ensure a service appears in search results is to write a detailed and accurate service description. If certain words or phrases cannot be part of the description, such as common misspellings, then the keywords field is where you can add them. '
              }
            </p>
            <FormTextField
              autocomplete={'off'}
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              name={'keywords'}
              id={'keywords'}
              label={'Keywords'}
              value={values.keywords}
              values={values}
              helperText={
                'You can enter multiple keywords in this box by pressing the comma key after each one.'
              }
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

Keywords.propTypes = {
  classes: PropTypes.shape({
    card: PropTypes.string,
    cardContent: PropTypes.string,
    cardTitle: PropTypes.string,
    keywordAlert: PropTypes.string,
  }),
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(combineStyles(sharedStyles, styles))(Keywords);
