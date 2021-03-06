import React, {Fragment} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import FormTextField from '@Shared/FormElements/TextFieldDefault';
import SelectElement from '@Shared/FormElements/Select';
import Checkbox from '@Shared/FormElements/Checkbox';

import {sharedStyles, sharedClasses} from './styles';
import {states} from '@StaticData/data';

const StreetAddress = props => {
  const {values, classes, handleChange, handleBlur, errors} = props;
  let streetAddress = null;

  if (!values.streetAddress.isVirtual) {
    streetAddress = (
      <Fragment>
        <Grid item={true} xs={12}>
          <FormTextField
            autocomplete={'off'}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'streetAddress.address'}
            name={'streetAddress.address'}
            label={'Address'}
            value={values.streetAddress.address}
            values={values}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <FormTextField
            autocomplete={'off'}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            name={'streetAddress.address2'}
            id={'streetAddress.address2'}
            label={'Address (Line 2)'}
            value={values.streetAddress.address2}
            values={values}
          />
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <FormTextField
            autocomplete={'off'}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'streetAddress.city'}
            name={'streetAddress.city'}
            label={'City'}
            value={values.streetAddress.city}
            values={values}
          />
        </Grid>
        <Grid item={true} xs={12} sm={3}>
          <SelectElement
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'streetAddress.state'}
            label={'State'}
            name={'streetAddress.state'}
            value={values.streetAddress.state}
            selectOptions={states}
          />
        </Grid>
        <Grid item={true} xs={12} sm={3}>
          <FormTextField
            autocomplete={'off'}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            name={'streetAddress.zip'}
            id={'streetAddress.zip'}
            label={'Zipcode'}
            value={values.streetAddress.zip}
            values={values}
          />
        </Grid>
      </Fragment>
    );
  }
  return (
    <div className={classes.card}>
      <div className={classes.cardTitle}>
        <span className={`${classes.cardTitle}__media`}>
          {'Street Address'}
        </span>
        <span className={`${classes.cardTitle}__small`}>
          {'The physical location.'}
        </span>
      </div>
      <div className={classes.cardContent}>
        <Grid container={true} spacing={16}>
          <Grid item={true} xs={12} md={9}>
            <Grid container={true} spacing={16}>
              <Grid item={true} xs={12}>
                <Checkbox
                  label="I have a virtual address"
                  name="streetAddress.isVirtual"
                  onChange={handleChange}
                  value={values.streetAddress.isVirtual}
                />
              </Grid>
              {streetAddress}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

StreetAddress.propTypes = {
  classes: sharedClasses,
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(sharedStyles)(StreetAddress);
