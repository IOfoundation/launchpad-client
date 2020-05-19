import React from 'react';
import Grid from '@material-ui/core/Grid';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import FormTextField from '@Shared/FormElements/TextFieldDefault';
import SelectElement from '@Shared/FormElements/Select';
import MultiSelectElement from '@Shared/FormElements/MultiSelect';

import {sharedStyles, sharedClasses} from '../LocationForm/styles';
import {
  servicesAreas,
  acceptedPayments,
  fundingSources,
  serviceStatus,
} from '@StaticData/data';

export const Overview = props => {
  const {errors, touched, handleBlur, handleChange, values, classes} = props;

  return (
    <div className="m-bot-40">
      <h2 className={classes.title}>{'Overview'}</h2>
      <Grid container={true} spacing={16}>
        <Grid item={true} xs={12}>
          <FormTextField
            autocomplete={'off'}
            error={touched.name && Boolean(errors.name)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'name'}
            label={'Service Name'}
            value={values.name}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <FormTextField
            autocomplete={'off'}
            error={touched.displayName && Boolean(errors.displayName)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'displayName'}
            label={'Display Name'}
            helperText={'This is how the name will appear to other users.'}
            value={values.displayName}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <FormTextField
            autocomplete={'off'}
            error={touched.description && Boolean(errors.description)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'description'}
            label={'Service Description'}
            helperText={'A description of the service.'}
            value={values.description}
            multiline={true}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <FormTextField
            autocomplete={'off'}
            error={touched.email && Boolean(errors.email)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'email'}
            label={'Service Email'}
            helperText={"The service's general email."}
            value={values.email}
          />
        </Grid>
        <Grid item={true} xs={12} md={8}>
          <FormTextField
            autocomplete={'off'}
            error={touched.website && Boolean(errors.website)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'website'}
            label={'Service Website'}
            value={values.website}
          />
        </Grid>
        <Grid item={true} xs={12} md={4}>
          <SelectElement
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'status'}
            label={'Service Status'}
            name={'status'}
            value={values.status}
            helperText={'Is this service active, inactive, or defunct?'}
            selectOptions={serviceStatus}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <MultiSelectElement
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'servicesAreas'}
            label={'Service Areas'}
            name={'servicesAreas'}
            value={values.servicesAreas}
            helperText={'What city or county does the location serve?'}
            selectOptions={servicesAreas}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <FormTextField
            autocomplete={'off'}
            error={touched.audience && Boolean(errors.audience)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'audience'}
            label={'Audience'}
            helperText={'What groups are served, if not everyone?'}
            value={values.audience}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <FormTextField
            autocomplete={'off'}
            error={touched.eligibility && Boolean(errors.eligibility)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'eligibility'}
            label={'Eligibility'}
            helperText={
              'What criteria must served groups meet to receive service?'
            }
            value={values.eligibility}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <FormTextField
            autocomplete={'off'}
            error={touched.fees && Boolean(errors.fees)}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'fees'}
            label={'Fees'}
            helperText={'Are there any fees to receive this service?'}
            value={values.fees}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <MultiSelectElement
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'acceptedPaymentMethods'}
            label={'Accepted Payment Methods'}
            name={'acceptedPaymentMethods'}
            value={values.acceptedPaymentMethods}
            helperText={'Select one or more payment methods'}
            selectOptions={acceptedPayments}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <MultiSelectElement
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            id={'fundingSources'}
            label={'Funding Sources'}
            name={'fundingSources'}
            value={values.fundingSources}
            helperText={'How is this service funded?'}
            selectOptions={fundingSources}
          />
        </Grid>
      </Grid>
    </div>
  );
};

Overview.propTypes = {
  classes: sharedClasses,
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(sharedStyles)(Overview);
