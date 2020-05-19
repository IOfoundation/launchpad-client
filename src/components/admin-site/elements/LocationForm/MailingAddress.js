import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import FormTextField from '@Shared/FormElements/TextFieldDefault';
import SelectElement from '@Shared/FormElements/Select';

import {sharedStyles, sharedClasses} from './styles';
import {states} from '@StaticData/data';

const MailingAddress = props => {
  const {values, classes, handleChange, handleBlur, errors} = props;

  return (
    <div className={classes.card}>
      <div className={classes.cardTitle}>
        <span className={`${classes.cardTitle}__media`}>
          {'Mailing Address'}
        </span>
      </div>
      <div className={classes.cardContent}>
        <Grid container={true} spacing={16}>
          <Grid item={true} xs={12} md={3}>
            <FormTextField
              autocomplete={'off'}
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              id={'mailingAddress.attention'}
              name={'mailingAddress.attention'}
              label={'Attention'}
              value={values.mailingAddress.attention}
              values={values}
            />
          </Grid>
          <Grid item={true} xs={12} md={9}>
            <Grid container={true} spacing={16}>
              <Grid item={true} xs={12}>
                <FormTextField
                  autocomplete={'off'}
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  id={'mailingAddress.address'}
                  name={'mailingAddress.address'}
                  label={'Address'}
                  value={values.mailingAddress.address}
                  values={values}
                />
              </Grid>
              <Grid item={true} xs={12}>
                <FormTextField
                  autocomplete={'off'}
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  name={'mailingAddress.address2'}
                  id={'mailingAddress.address2'}
                  label={'Address (Line 2)'}
                  value={values.mailingAddress.address2}
                  values={values}
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <FormTextField
                  autocomplete={'off'}
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  id={'mailingAddress.city'}
                  name={'mailingAddress.city'}
                  label={'City'}
                  value={values.mailingAddress.city}
                  values={values}
                />
              </Grid>
              <Grid item={true} xs={12} sm={3}>
                <SelectElement
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  id={'mailingAddress.state'}
                  label={'State'}
                  name={'mailingAddress.state'}
                  value={values.mailingAddress.state}
                  selectOptions={states}
                />
              </Grid>
              <Grid item={true} xs={12} sm={3}>
                <FormTextField
                  autocomplete={'off'}
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  name={'mailingAddress.zip'}
                  id={'mailingAddress.zip'}
                  label={'Zipcode'}
                  value={values.mailingAddress.zip}
                  values={values}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

MailingAddress.propTypes = {
  classes: sharedClasses,
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(sharedStyles)(MailingAddress);
