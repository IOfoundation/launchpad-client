import React, {Fragment} from 'react';
import {Form, FieldArray} from 'formik';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import FormTextField from '@Shared/FormElements/TextFieldDefault';
import SelectElement from '@Shared/FormElements/Select';

import {
  sectionOnePhoto,
  sectionOneRegular,
  socialSection,
  phoneNumberSection,
} from './ProfileForm/elements';

const ProfileForm = props => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
    classes,
  } = props;

  return (
    <Form className="profile-form" onSubmit={handleSubmit}>
      <div className={classes.containerFlex}>
        <div className={classes.sectionOnePhotoElement}>
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
        </div>
        <div
          className={['img-wrapper', classes.sectionOnePhotoPhoto].join(' ')}
        >
          <img src="https://via.placeholder.com/150" />
        </div>
      </div>
      <div className={classes.sectionOneRegular}>
        {sectionOneRegular.map(form => {
          return (
            <div key={form.key} className={classes.sectionOneItem}>
              <FormTextField
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
              />
            </div>
          );
        })}
      </div>
      <div className={`${classes.card} m-top-16`}>
        <div className={classes.cardTitle}>
          <span className={`${classes.cardTitle}__media`}>
            {'Social Media Links'}
          </span>
          <span className={`${classes.cardTitle}__small`}>
            {'Please enter the full URL for social media sites.'}
          </span>
        </div>
        <div className={`${classes.cardContent}`}>
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
        <div className={`${classes.cardContent} ${classes.phoneItemWrapper}`}>
          <FieldArray
            name="phones"
            render={arrayHelpers => (
              <Fragment>
                {values.phones.map((phone, index) => {
                  const phoneMap = Object.keys(phone).map((key, i) => {
                    const id = `phones[${index}].${key}`;
                    const map = phoneNumberSection[i];
                    const error =
                      touched.phones &&
                      touched.phones[index] &&
                      touched.phones[index][key] &&
                      Boolean(
                        errors.phones &&
                          errors.phones[index] &&
                          errors.phones[index][key]
                      );

                    return (
                      <div key={id} className={classes.phoneItem}>
                        {map.select ? (
                          <SelectElement
                            errors={errors}
                            field="phones"
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            id={id}
                            key={id}
                            label={map.label}
                            name={id}
                            value={phone[key]}
                          />
                        ) : (
                          <FormTextField
                            autocomplete={map.autocomplete}
                            error={error}
                            errors={errors}
                            field="phones"
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            helperText={map.helperText}
                            id={key}
                            key={id}
                            label={map.label}
                            name={id}
                            value={phone[key]}
                          />
                        )}
                      </div>
                    );
                  });

                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <Fragment key={index}>
                      {phoneMap}
                      <div
                        className={`${classes.btnWrapper} ${
                          classes.bottomLine
                        }`}
                      >
                        <button
                          type="button"
                          className={`btn btn__red ${classes.btn}`}
                          disabled={values.phones.length === 1}
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          {'Delete Phone Number'}
                        </button>
                      </div>
                      <div className={classes.btnWrapper}>
                        <button
                          type="button"
                          className={`btn btn__submit ${classes.btn}`}
                          onClick={() =>
                            arrayHelpers.insert(index, {
                              phoneNumber: '1',
                              ext: '',
                              vanityNumber: '',
                              numberType: '',
                              department: '',
                              countryExt: '',
                            })
                          }
                        >
                          {'Add New Phone Number'}
                        </button>
                      </div>
                    </Fragment>
                  );
                })}
              </Fragment>
            )}
          />
        </div>
      </div>
    </Form>
  );
};

const styles = () => {
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
      margin: '15px 0',
    },
    bottomLine: {
      borderBottom: '1px solid #E0E0E0',
    },
  };
};

ProfileForm.propTypes = {
  classes: PropTypes.shape({
    btn: PropTypes.string,
    btnWrapper: PropTypes.string,
    bottomLine: PropTypes.string,
    card: PropTypes.string,
    cardContent: PropTypes.string,
    cardTitle: PropTypes.string,
    containerFlex: PropTypes.string,
    phoneItem: PropTypes.string,
    phoneItemWrapper: PropTypes.string,
    sectionOnePhotoElement: PropTypes.string,
    sectionOnePhotoPhoto: PropTypes.string,
  }),
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  touched: PropTypes.shape({
    password: PropTypes.bool,
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
    password: PropTypes.string,
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
