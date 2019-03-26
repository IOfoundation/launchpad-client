import React, {Fragment} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {FieldArray} from 'formik';
import Grid from '@material-ui/core/Grid';

import FormTextField from '@Shared/FormElements/TextFieldDefault';
import SelectElement from '@Shared/FormElements/Select';

import {sharedStyles, sharedClasses} from './styles';
import {phoneNumberSection} from '../ProfileForm/elements';

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
        <Grid container={true} spacing={16}>
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
                      <Grid key={id} item={true} xs={12} md={6}>
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
                      </Grid>
                    );
                  });

                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <Fragment key={index}>
                      {phoneMap}
                      <Grid item={true} xs={12}>
                        <div className={classes.bottomLine}>
                          <button
                            type="button"
                            className={`btn btn__red ${classes.btn}`}
                            disabled={values.phones.length === 1}
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            {'Delete Phone Number'}
                          </button>
                        </div>
                      </Grid>
                      <Grid item={true} xs={12}>
                        <button
                          type="button"
                          className={`btn btn__submit ${classes.btn} ${
                            classes.lastBtn
                          }`}
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
                      </Grid>
                    </Fragment>
                  );
                })}
              </Fragment>
            )}
          />
        </Grid>
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
