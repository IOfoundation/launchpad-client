import React, {Fragment, PureComponent} from 'react';
import {ErrorMessage, getIn} from 'formik';
import {PropTypes} from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import Masks from './Masks';

class FormTextFieldDefault extends PureComponent {
  changeHandler = (name, event) => {
    const {handleChange, errors, handleBlur} = this.props;

    event.persist();
    handleChange(event);
    if (errors[name] || getIn(errors, name)) {
      handleBlur(event);
    }
  };

  _isTimePicker(type) {
    return type === 'time';
  }

  _isDatePicker(type) {
    return type === 'date';
  }

  render() {
    const {
      autocomplete,
      error,
      handleBlur,
      helperText,
      id,
      label,
      marginBottom,
      multiline,
      name,
      type = 'text',
      value,
      rows,
      rowsMax,
      novalidate,
      startAdornment,
      endAdornment,
      mask,
      step = 300,
    } = this.props;
    let InputLabelProps = null;
    let inputProps = {};
    let InputProps = {};
    let displayError = (
      <div
        className={[
          'admin-login-form__input__error-wrapper',
          marginBottom ? 'm-bot-24' : '',
        ].join(' ')}
      >
        <ErrorMessage
          className="admin-login-form__error"
          component="div"
          name={name || id}
        />
      </div>
    );

    if (this._isDatePicker(type) || this._isTimePicker(type)) {
      InputLabelProps = {
        shrink: true,
      };
    }

    if (this._isTimePicker(type)) {
      inputProps = {
        autoComplete: autocomplete,
        step,
      };
    }

    if (novalidate) {
      displayError = null;
    }

    if (mask) {
      InputProps = {
        inputComponent: Masks[mask],
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : null,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : null,
      };
    }

    return (
      <Fragment>
        <TextField
          error={error}
          fullWidth={true}
          helperText={helperText}
          id={id}
          InputProps={InputProps}
          InputLabelProps={InputLabelProps}
          inputProps={inputProps}
          label={label}
          multiline={multiline}
          name={name}
          onBlur={handleBlur}
          onChange={event => this.changeHandler(name, event)}
          rows={rows}
          rowsMax={rowsMax}
          type={type}
          value={value}
        />
        {displayError}
      </Fragment>
    );
  }
}

FormTextFieldDefault.propTypes = {
  autocomplete: PropTypes.string,
  endAdornment: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  error: PropTypes.bool,
  errors: PropTypes.shape({}),
  field: PropTypes.string,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  helperText: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  marginBottom: PropTypes.bool,
  mask: PropTypes.string,
  multiline: PropTypes.bool,
  name: PropTypes.string,
  novalidate: PropTypes.bool,
  phones: PropTypes.string,
  rows: PropTypes.string,
  rowsMax: PropTypes.string,
  startAdornment: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  step: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default FormTextFieldDefault;
