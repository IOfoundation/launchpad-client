import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {sharedStyles} from '../LocationForm/styles';
import Grid from '@material-ui/core/Grid';

import FormTextField from '../../../shared/FormElements/TextFieldDefault';
import SelectElement from '../../../shared/FormElements/Select';

import {combineStyles} from '../../../../utils';

const Detail = props => {
  const {values, classes, handleChange, handleBlur, errors} = props;

  return (
    <div className={classes.card}>
      <div className={classes.cardTitle}>
        <span className={`${classes.cardTitle}__media`}>
          {'Service Details'}
        </span>
      </div>
      <div className={classes.cardContent}>
        <Grid container={true}>
          <Grid item={true} xs={12} className={classes.mBot8}>
            <FormTextField
              autocomplete={'off'}
              errors={errors}
              novalidate={true}
              handleBlur={handleBlur}
              handleChange={handleChange}
              name={'applicationProcess'}
              id={'applicationProcess'}
              label={'Application Process'}
              value={values.applicationProcess}
              values={values}
              helperText={
                'How does a client apply to receive services, if applicable?'
              }
            />
          </Grid>
          <Grid item={true} xs={12} className={classes.mBot8}>
            <SelectElement
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              id={'requiredDocuments'}
              label={'Required Documents'}
              name={'requiredDocuments'}
              novalidate={true}
              value={values.requiredDocuments}
              helperText={
                'Select which documents are required to receive this service.'
              }
            />
          </Grid>
          <Grid item={true} xs={12} className={classes.mBot8}>
            <SelectElement
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              id={'serviceLanguages'}
              label={'Service Languages'}
              name={'serviceLanguages'}
              novalidate={true}
              value={values.serviceLanguages}
              helperText={
                'Select which languages this service is provided in. '
              }
            />
          </Grid>
          <Grid item={true} xs={12} className={classes.mBot8}>
            <FormTextField
              autocomplete={'off'}
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              name={'interpretationServices'}
              novalidate={true}
              id={'interpretationServices'}
              label={'Interpretation Services'}
              value={values.interpretationServices}
              values={values}
              helperText={'What kind of interpretation services are available?'}
            />
          </Grid>
          <Grid item={true} xs={12}>
            <FormTextField
              autocomplete={'off'}
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              name={'waitTime'}
              novalidate={true}
              id={'waitTime'}
              label={'Wait Time'}
              value={values.waitTime}
              values={values}
              helperText={
                'How long on average does a client need to wait to receive services?'
              }
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const styles = () => {
  return {
    mBot8: {
      marginBottom: '8px',
    },
  };
};

Detail.propTypes = {
  classes: PropTypes.shape({
    card: PropTypes.string,
    cardTitle: PropTypes.string,
    cardContent: PropTypes.string,
    mBot8: PropTypes.string,
  }),
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(combineStyles(sharedStyles, styles))(Detail);
