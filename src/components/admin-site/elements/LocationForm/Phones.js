import React, {Fragment} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {sharedStyles, sharedClasses} from './styles';
import {phoneNumberSection} from '../ProfileForm/elements';
import {FieldArray} from 'formik';

import FormTextField from '../../../shared/FormElements/TextFieldDefault';
import SelectElement from '../../../shared/FormElements/Select';

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
                      className={`${classes.btnWrapper} ${classes.bottomLine}`}
                    >
                      <button
                        type="button"
                        className={`btn btn__red ${classes.btn}`}
                        disabled={values.phones.length === 1}
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        {'DELETE PHONE NUMBER'}
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
