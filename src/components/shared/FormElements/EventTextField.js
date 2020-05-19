import React, {Fragment, PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {ErrorMessage, getIn} from 'formik';
import {withStyles} from '@material-ui/core/styles';

class EventTextField extends PureComponent {
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
      step = 300,
      classes,
    } = this.props;
    let InputLabelProps = {
      classes: {
        root: classes.cssLabel,
        focused: classes.cssFocused,
        error: classes.cssError,
        disabled: classes.cssDisabled,
      },
    };
    let InputProps = {
      classes: {
        root: classes.cssOutlinedInput,
        formControl: classes.cssFormControl,
        error: classes.cssError,
        disabled: classes.cssDisabled,
      },
    };
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

    if (multiline) {
      InputProps = {
        classes: {
          root: classes.cssOutlinedInput,
        },
      };
    }

    if (this._isDatePicker(type) || this._isTimePicker(type)) {
      InputLabelProps = {
        ...InputLabelProps,
        shrink: true,
      };
    }

    if (this._isTimePicker(type)) {
      InputProps = {
        ...InputProps,
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
          helperText={helperText}
          id={id}
          InputLabelProps={InputLabelProps}
          inputProps={InputProps}
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

const styles = () => ({
  cssLabel: {
    color: '#070709',
    fontSize: '16px',
    fontFamily: '"proxima-nova-thin", Georgia, sans-serif',
    lineHeight: '24px',
  },
  cssOutlinedInput: {
    fontFamily: "'proxima-nova-regular', Georgia, sans-serif",
    color: '#070709',
  },
  cssDisabled: {},
  cssFormControl: {},
  cssError: {
    color: '#D61600 !important',
  },
});

EventTextField.propTypes = {
  autocomplete: PropTypes.string,
  classes: PropTypes.shape({
    cssLabel: PropTypes.string,
    cssOutlinedInput: PropTypes.string,
    cssDisabled: PropTypes.string,
    cssFocused: PropTypes.string,
    cssFormControl: PropTypes.string,
    cssError: PropTypes.string,
  }),
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
  rows: PropTypes.string,
  rowsMax: PropTypes.string,
  step: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default withStyles(styles)(EventTextField);
