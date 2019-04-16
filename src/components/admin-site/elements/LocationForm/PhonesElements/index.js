import React, {PureComponent, Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import {PropTypes} from 'prop-types';
import {FieldArray} from 'formik';
import {withStyles} from '@material-ui/core/styles';

import FormTextField from '@Shared/FormElements/TextFieldDefault';
import SelectElement from '@Shared/FormElements/Select';

import {numberType} from '@StaticData/data';

class Phones extends PureComponent {
  constructor(props) {
    super(props);
    this.displayErrors = this._errorsContext();
  }

  _errorsContext() {
    const {touched, errors} = this.props;
    return (index, key) => {
      return (
        touched.phones &&
        touched.phones[index] &&
        touched.phones[index][key] &&
        Boolean(
          errors.phones && errors.phones[index] && errors.phones[index][key]
        )
      );
    };
  }

  _detelePhone(arrayHelpers, index, id) {
    const {values} = this.props;

    if (id) {
      values.deletedPhones.push({
        id,
        _destroy: true,
      });
    }
    arrayHelpers.remove(index);
  }

  render() {
    const {handleBlur, handleChange, values, classes, errors} = this.props;

    return (
      <Grid container={true} spacing={16}>
        <FieldArray
          name="phones"
          render={arrayHelpers => (
            <Fragment>
              {values.phones.length > 0 ? (
                values.phones.map((phone, index) => {
                  const phoneMap = (
                    <Fragment>
                      <Grid item={true} xs={12} md={6}>
                        <FormTextField
                          autocomplete={'off'}
                          error={this.displayErrors(index, 'phoneNumber')}
                          errors={errors}
                          field="phones"
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          id={'phoneNumber'}
                          label={'Number'}
                          name={`phones[${index}].phoneNumber`}
                          value={phone.phoneNumber}
                        />
                      </Grid>
                      <Grid item={true} xs={12} md={6}>
                        <FormTextField
                          autocomplete={'off'}
                          errors={errors}
                          error={this.displayErrors(index, 'ext')}
                          field="phones"
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          id={'ext'}
                          label={'Extension'}
                          name={`phones[${index}].ext`}
                          value={phone.ext}
                        />
                      </Grid>
                      <Grid item={true} xs={12} md={6}>
                        <FormTextField
                          autocomplete={'off'}
                          errors={errors}
                          error={this.displayErrors(index, 'vanityNumber')}
                          field="phones"
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          id={'vanityNumber'}
                          label={'Vanity Number (ex: 650-123-HELP)'}
                          name={`phones[${index}].vanityNumber`}
                          value={phone.vanityNumber}
                        />
                      </Grid>

                      <Grid item={true} xs={12} md={6}>
                        <SelectElement
                          errors={errors}
                          field="phones"
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          id={`phones[${index}].numberType`}
                          label={'Number Type'}
                          name={`phones[${index}].numberType`}
                          value={phone.numberType}
                          selectOptions={numberType}
                        />
                      </Grid>

                      <Grid item={true} xs={12} md={6}>
                        <FormTextField
                          autocomplete={'off'}
                          errors={errors}
                          error={this.displayErrors(index, 'department')}
                          field="phones"
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          id={'department'}
                          label={'Department'}
                          name={`phones[${index}].department`}
                          value={phone.department}
                        />
                      </Grid>

                      <Grid item={true} xs={12} md={6}>
                        <FormTextField
                          autocomplete={'off'}
                          errors={errors}
                          error={this.displayErrors(index, 'countryExt')}
                          field="phones"
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          id={'countryExt'}
                          label={'Country Prefix Code (for example: 1)'}
                          name={`phones[${index}].countryExt`}
                          value={phone.countryExt}
                        />
                      </Grid>
                    </Fragment>
                  );

                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <Fragment key={index}>
                      {phoneMap}
                      <Grid item={true} xs={12}>
                        <div className={classes.bottomLine}>
                          <button
                            type="button"
                            className={`btn btn__red ${classes.btn}`}
                            onClick={() =>
                              this._detelePhone(arrayHelpers, index, phone.id)
                            }
                          >
                            {'Delete Phone Number'}
                          </button>
                        </div>
                      </Grid>
                      <Grid item={true} xs={12}>
                        <button
                          type="button"
                          className={`btn btn__submit ${classes.btn}`}
                          onClick={() =>
                            arrayHelpers.insert(index, {
                              phoneNumber: '',
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
                })
              ) : (
                <div className={classes.center}>
                  <button
                    type="button"
                    className={`btn btn__submit ${classes.btn}`}
                    onClick={() =>
                      arrayHelpers.push({
                        phoneNumber: '',
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
              )}
            </Fragment>
          )}
        />
      </Grid>
    );
  }
}

const styles = theme => {
  return {
    btn: {
      width: '260px',
      margin: '0 0 16px',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '243px',
        width: '100%',
      },
    },
    center: {
      alignContent: 'center',
      alignItems: 'center',
      display: 'flex',
      padding: '25px 8px 8px',
    },
    bottomLine: {
      borderBottom: '1px solid #E0E0E0',
    },
  };
};

Phones.propTypes = {
  classes: PropTypes.shape({
    bottomLine: PropTypes.string,
    btn: PropTypes.string,
    center: PropTypes.string,
  }),
  errors: PropTypes.shape({
    phones: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({
    phones: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  values: PropTypes.shape({
    phones: PropTypes.arrayOf(
      PropTypes.shape({
        phoneNumber: PropTypes.string,
        ext: PropTypes.string,
        vanityNumber: PropTypes.string,
        numberType: PropTypes.string,
        department: PropTypes.string,
        countryExt: PropTypes.string,
      })
    ),
  }),
};

export default withStyles(styles)(Phones);
