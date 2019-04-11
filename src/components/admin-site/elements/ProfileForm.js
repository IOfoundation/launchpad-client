import React from 'react';
import {Form} from 'formik';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import FormTextField from '@Shared/FormElements/TextFieldDefault';
import Phones from './ProfileForm/Phones';

import {
  sectionOnePhoto,
  sectionOneRegular,
  socialSection,
} from './ProfileForm/elements';

const ProfileForm = props => {
  const {
    breakpoint,
    classes,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
  } = props;

  return (
    <Form className="profile-form" onSubmit={handleSubmit} style={{padding: 8}}>
      <Grid
        container={true}
        spacing={16}
        direction={
          breakpoint === 'xs' || breakpoint === 'sm' ? 'column-reverse' : 'row'
        }
      >
        <Grid item={true} xs={12} md={8}>
          {sectionOnePhoto.map(form => {
            return (
              <FormTextField
                key={form.key}
                error={touched[form.key] && Boolean(errors[form.key])}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
                id={form.key}
                label={form.label}
                autocomplete={form.autocomplete}
                value={values[form.key]}
                helperText={form.helperText}
              />
            );
          })}
        </Grid>
        <Grid item={true} xs={12} md={4}>
          <div
            className={`img-wrapper img-wrapper--border ${classes.imageHeight}`}
          >
            <img src="https://via.placeholder.com/150" />
          </div>
        </Grid>
      </Grid>
      <Grid container={true} spacing={16}>
        <Grid item={true} xs={12}>
          {sectionOneRegular.map(form => {
            return (
              <FormTextField
                key={form.key}
                error={touched[form.key] && Boolean(errors[form.key])}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
                id={form.key}
                label={form.label}
                multiline={form.multiline}
                autocomplete={form.autocomplete}
                value={values[form.key]}
                helperText={form.helperText}
                type={form.key === 'dateIncorporation' ? 'date' : 'text'}
              />
            );
          })}
        </Grid>
      </Grid>
      <div className={`${classes.card} m-top-16`}>
        <div className={classes.cardTitle}>
          <span className={`${classes.cardTitle}__media`}>
            {'Social Media Links'}
          </span>
          <span className={`${classes.cardTitle}__small`}>
            {'Please enter the full URL for social media sites.'}
          </span>
        </div>
        <div className={`${classes.cardContent}`} style={{padding: 8}}>
          <Grid container={true} spacing={16}>
            <Grid item={true} xs={12}>
              {socialSection.map(form => {
                return (
                  <FormTextField
                    key={form.key}
                    error={touched[form.key] && Boolean(errors[form.key])}
                    errors={errors}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    id={form.key}
                    label={form.label}
                    autocomplete={form.autocomplete}
                    value={values[form.key]}
                    helperText={form.helperText}
                  />
                );
              })}
            </Grid>
          </Grid>
        </div>
      </div>

      <div className={classes.card}>
        <div className={classes.cardTitle}>
          <span className={`${classes.cardTitle}__media`}>
            {'Phone Numbers'}
          </span>
          <span className={`${classes.cardTitle}__small`}>
            {
              'If the phone number belongs to a contact, please move it to the existing contact, or add a new contact.'
            }
          </span>
        </div>
        <div className={classes.cardContent} style={{padding: 8}}>
          <Phones
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
          />
        </div>
      </div>
    </Form>
  );
};

const styles = theme => {
  return {
    containerFlex: {
      display: 'flex',
    },
    sectionOnePhotoElement: {
      flex: 1,
    },
    sectionOnePhotoPhoto: {
      height: '200px',
      width: '222px',
      border: '1px solid black',
      marginLeft: '24px',
    },
    sectionOneRegular: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    sectionOneItem: {
      width: '100%',
      boxSizing: 'border-box',
      '&:nth-child(4)': {
        width: 'calc(33.3% - 24px)',
        marginRight: '24px',
      },
      '&:nth-child(5)': {
        width: 'calc(33.3% - 24px)',
        marginRight: '24px',
      },
      '&:nth-child(6)': {
        width: '33.3%',
      },
    },
    card: {
      border: '1px solid black',
      marginBottom: '40px',
    },
    cardTitle: {
      color: 'white',
      background: 'black',
      padding: '8px 12px',
      '&__media': {
        fontSize: '16px',
        lineHeight: '24px',
        marginRight: '8px',
      },
      '&__small': {
        fontSize: '12px',
        lineHeight: '16px',
        opacity: '0.75',
      },
    },
    cardContent: {
      padding: '16px',
      background: 'white',
    },
    phoneItemWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    phoneItem: {
      width: 'calc(45% - 24px)',
      marginRight: '24px',
    },
    btnWrapper: {
      width: '100%',
    },
    btn: {
      width: '260px',
      margin: '0 0 16px',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '243px',
        width: '100%',
      },
    },
    bottomLine: {
      borderBottom: '1px solid #E0E0E0',
    },
    imageHeight: {
      [theme.breakpoints.down('sm')]: {
        width: '200px',
        margin: '0 auto',
      },
      [theme.breakpoints.only('sm')]: {
        width: '400px',
      },
    },
  };
};

ProfileForm.propTypes = {
  breakpoint: PropTypes.string,
  classes: PropTypes.shape({
    bottomLine: PropTypes.string,
    btn: PropTypes.string,
    btnWrapper: PropTypes.string,
    card: PropTypes.string,
    cardContent: PropTypes.string,
    cardTitle: PropTypes.string,
    containerFlex: PropTypes.string,
    imageHeight: PropTypes.string,
    phoneItem: PropTypes.string,
    phoneItemWrapper: PropTypes.string,
    sectionOnePhotoElement: PropTypes.string,
    sectionOnePhotoPhoto: PropTypes.string,
  }),
  errors: PropTypes.shape({
    contactEmail: PropTypes.string,
    organizationName: PropTypes.string,
    name: PropTypes.string,
    website: PropTypes.string,
    description: PropTypes.string,
    accreditations: PropTypes.string,
    dateIncorporation: PropTypes.string,
    legalStatus: PropTypes.string,
    fundingSources: PropTypes.string,
    licenses: PropTypes.string,
    taxIdentifier: PropTypes.string,
    taxStatus: PropTypes.string,
    twitter: PropTypes.string,
    facebook: PropTypes.string,
    linkedin: PropTypes.string,
    phoneNumber: PropTypes.string,
    ext: PropTypes.string,
    vanityNumber: PropTypes.string,
    numberType: PropTypes.string,
    department: PropTypes.string,
    countryExt: PropTypes.string,
  }),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  touched: PropTypes.shape({
    contactEmail: PropTypes.bool,
    organizationName: PropTypes.bool,
    name: PropTypes.bool,
    website: PropTypes.bool,
    description: PropTypes.bool,
    accreditations: PropTypes.bool,
    dateIncorporation: PropTypes.bool,
    legalStatus: PropTypes.bool,
    fundingSources: PropTypes.bool,
    licenses: PropTypes.bool,
    taxIdentifier: PropTypes.bool,
    taxStatus: PropTypes.bool,
    twitter: PropTypes.bool,
    facebook: PropTypes.bool,
    linkedin: PropTypes.bool,
    phoneNumber: PropTypes.bool,
    ext: PropTypes.bool,
    vanityNumber: PropTypes.bool,
    numberType: PropTypes.bool,
    department: PropTypes.bool,
    countryExt: PropTypes.bool,
  }),
  values: PropTypes.shape({
    contactEmail: PropTypes.string,
    organizationName: PropTypes.string,
    name: PropTypes.string,
    website: PropTypes.string,
    description: PropTypes.string,
    accreditations: PropTypes.string,
    dateIncorporation: PropTypes.string,
    legalStatus: PropTypes.string,
    fundingSources: PropTypes.string,
    licenses: PropTypes.string,
    taxIdentifier: PropTypes.string,
    taxStatus: PropTypes.string,
    twitter: PropTypes.string,
    facebook: PropTypes.string,
    linkedin: PropTypes.string,
    phoneNumber: PropTypes.string,
    ext: PropTypes.string,
    vanityNumber: PropTypes.string,
    numberType: PropTypes.string,
    department: PropTypes.string,
    countryExt: PropTypes.string,
  }),
};

export default withStyles(styles)(ProfileForm);
