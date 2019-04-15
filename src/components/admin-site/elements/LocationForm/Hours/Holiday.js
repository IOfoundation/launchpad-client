import React, {PureComponent, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {FieldArray} from 'formik';
import Grid from '@material-ui/core/Grid';

import SelectElement from '@Shared/FormElements/Select';
import FormTextField from '@Shared/FormElements/TextFieldDefault';

import {sharedStyles, sharedClasses} from '../styles';
import {closes} from '@StaticData/data';

class Item extends PureComponent {
  _deleteItem(arrayHelpers, index, id) {
    const {values, field} = this.props;

    if (id) {
      values[`delete_${field}`].push({
        id,
        _destroy: true,
      });
    }

    arrayHelpers.remove(index);
  }

  render() {
    const {
      titleLabel,
      buttonLabel,
      formValue,
      handleBlur,
      handleChange,
      errors,
      field,
    } = this.props;

    const addHoursOfOperation = arrayHelpers => {
      arrayHelpers.push({day: '', opensAt: '', closesAt: ''});
    };

    return (
      <FieldArray
        name={field}
        render={arrayHelpers => (
          <Fragment>
            {<h3 className="form-titles">{titleLabel}</h3>}
            {formValue && formValue.length > 0 ? (
              <Fragment>
                {formValue.map((hour, index) => {
                  const closed = `${field}[${index}].closed`;
                  const startDate = `${field}[${index}].startDate`;
                  const endDate = `${field}[${index}].endDate`;
                  const opensAt = `${field}[${index}].opensAt`;
                  const closesAt = `${field}[${index}].closesAt`;

                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <Fragment key={index}>
                      <Grid container={true} spacing={16} alignItems="center">
                        <Grid item={true} xs={4}>
                          <FormTextField
                            autocomplete={'off'}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name={startDate}
                            id={startDate}
                            label="Start date"
                            field={field}
                            value={hour.startDate}
                            type="date"
                          />
                        </Grid>
                        <Grid item={true} xs={4}>
                          <FormTextField
                            autocomplete={'off'}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name={endDate}
                            id={endDate}
                            label="End Date"
                            field={field}
                            value={hour.endDate}
                            type="date"
                          />
                        </Grid>
                      </Grid>
                      <Grid container={true} spacing={16} alignItems="center">
                        <Grid item={true} xs={8}>
                          <SelectElement
                            errors={errors}
                            field={field}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            id={closed}
                            key={closed}
                            label="Closed or open during the above dates?"
                            name={closed}
                            value={hour.closed}
                            selectOptions={closes}
                          />
                        </Grid>
                      </Grid>

                      <Grid container={true} spacing={16} alignItems="center">
                        <Grid item={true} xs={4}>
                          <FormTextField
                            autocomplete={'off'}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name={opensAt}
                            id={opensAt}
                            label="Opens At"
                            field={field}
                            value={hour.opensAt}
                            type="time"
                          />
                        </Grid>

                        <Grid item={true} xs={4}>
                          <FormTextField
                            autocomplete={'off'}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name={closesAt}
                            label="Closes At"
                            id={closesAt}
                            field={field}
                            value={hour.closesAt}
                            type="time"
                          />
                        </Grid>
                        <Grid item={true} xs={1}>
                          <i
                            className="material-icons title-as-link"
                            style={{color: 'black'}}
                            aria-owns={'delete-hour'}
                            aria-haspopup="true"
                            onClick={() =>
                              this._deleteItem(arrayHelpers, index, hour.id)
                            }
                          >
                            {'delete'}
                          </i>
                        </Grid>
                      </Grid>
                    </Fragment>
                  );
                })}
                <button
                  className="btn btn__submit"
                  type="button"
                  style={{width: '260px'}}
                  onClick={() => addHoursOfOperation(arrayHelpers)}
                >
                  {buttonLabel}
                </button>
              </Fragment>
            ) : (
              <button
                className="btn btn__submit"
                type="button"
                style={{width: '260px'}}
                onClick={() => addHoursOfOperation(arrayHelpers)}
              >
                {buttonLabel}
              </button>
            )}
          </Fragment>
        )}
      />
    );
  }
}

Item.propTypes = {
  arrayHelpers: PropTypes.shape({}),
  buttonLabel: PropTypes.string,
  classes: sharedClasses,
  errors: PropTypes.shape({}),
  field: PropTypes.string,
  formValue: PropTypes.arrayOf(PropTypes.shape({})),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  hour: PropTypes.string,
  titleLabel: PropTypes.string,
  values: PropTypes.shape({}),
};

export default withStyles(sharedStyles)(Item);
