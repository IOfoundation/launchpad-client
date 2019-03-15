import React, {PureComponent, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {sharedStyles, sharedClasses} from '../styles';
import {FieldArray} from 'formik';
import SelectElement from '../../../../shared/FormElements/Select';
import FormTextField from '../../../../shared/FormElements/TextFieldDefault';
import Grid from '@material-ui/core/Grid';

class Item extends PureComponent {
  deleteItem = () => {
    const {arrayHelpers, id} = this.props;

    arrayHelpers.remove(id);
  };

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
                      <Grid item={true} xs={4}>
                        <SelectElement
                          errors={errors}
                          field={field}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          id={day}
                          key={day}
                          label="Day"
                          name={day}
                          value={hour.day}
                        />
                      </Grid>
                      <Grid item={true} xs={3}>
                        <FormTextField
                          autocomplete={'off'}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name={opensAt}
                          id={opensAt}
                          label="Opens At"
                          field={field}
                          value={hour.closesAt}
                          type="time"
                        />
                      </Grid>

                      <Grid item={true} xs={3}>
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
                          onClick={() => arrayHelpers.remove(index)}
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
  id: PropTypes.number,
  titleLabel: PropTypes.string,
};

export default withStyles(sharedStyles)(Item);
