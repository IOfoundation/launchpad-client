import React, {Fragment, PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {ErrorMessage, getIn} from 'formik';

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
      novalidate,
      step = 300,
    } = this.props;
    let InputLabelProps = null;
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
      InputProps = {
        autoComplete: autocomplete,
        step,
      };
    }

    if (novalidate) {
      displayError = null;
    }

    return (
      <Fragment>
        <TextField
          error={error}
          fullWidth={true}
          id={id}
          type={type}
          label={label}
          onChange={event => this.changeHandler(name, event)}
          onBlur={handleBlur}
          value={value}
          name={name}
          multiline={multiline}
          helperText={helperText}
          inputProps={InputProps}
          InputLabelProps={InputLabelProps}
        />
        {displayError}
      </Fragment>
    );
  }
}

FormTextFieldDefault.propTypes = {
  autocomplete: PropTypes.string,
  error: PropTypes.bool,
  errors: PropTypes.shape({}),
  field: PropTypes.string,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  helperText: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  marginBottom: PropTypes.bool,
  multiline: PropTypes.bool,
  name: PropTypes.string,
  novalidate: PropTypes.bool,
  phones: PropTypes.string,
  step: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default FormTextFieldDefault;
