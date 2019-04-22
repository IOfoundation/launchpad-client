import React, {PureComponent, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {FieldArray} from 'formik';
import Grid from '@material-ui/core/Grid';

import SelectElement from '@Shared/FormElements/Select';
import FormTextField from '@Shared/FormElements/TextFieldDefault';

import {sharedStyles, sharedClasses} from '../styles';
import {weekdays} from '@StaticData/data';

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
                  const day = `${field}[${index}].day`;
                  const opensAt = `${field}[${index}].opensAt`;
                  const closesAt = `${field}[${index}].closesAt`;

                  return (
                    <Grid
                      container={true}
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      spacing={16}
                      alignItems="center"
                    >
                      <Grid item={true} xs={10} sm={4}>
                        <SelectElement
                          errors={errors}
                          field={field}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          id={day}
                          key={day}
                          label="Day"
                          name={day}
                          value={String(hour.day)}
                          selectOptions={weekdays}
                        />
                      </Grid>
                      <Grid item={true} xs={10} sm={3}>
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
                          step={900}
                        />
                      </Grid>

                      <Grid item={true} xs={10} sm={3}>
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
                          step={900}
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
