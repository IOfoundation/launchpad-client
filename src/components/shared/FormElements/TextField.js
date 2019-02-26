import React, {Fragment, PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import {ErrorMessage} from 'formik';

const styles = () => ({
  cssLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: '"proxima-nova-thin", Georgia, sans-serif',
  },
  cssOutlinedInput: {
    '&$cssFocused': {
      borderColor: 'white',
    },
    '&:after, &:hover:before': {
      borderColor: 'white',
    },
    '&:hover:not($cssDisabled):not($cssError):before': {
      borderBottom: '2px solid rgba(255, 255, 255, 0.7) !important',
    },
    '&:before': {
      borderColor: 'rgba(255, 255, 255, 0.7)',
    },
  },
  cssDisabled: {},
  cssFocused: {
    color: 'white',
    '&$cssLabel': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
  cssFormControl: {
    color: 'white',
  },
  cssError: {
    color: '#D61600 !important',
  },
});

class FormTextField extends PureComponent {
  changeHandler = (name, event) => {
    const {handleChange, errors, handleBlur} = this.props;

    event.persist();
    handleChange(event);
    if (errors[name]) {
      handleBlur(event);
    }
  };

  render() {
    const {
      autocomplete,
      classes,
      error,
      handleBlur,
      id,
      label,
      multiline,
      spacing,
      type = 'text',
      value,
    } = this.props;

    return (
      <Fragment>
        <TextField
          error={error}
          fullWidth={true}
          id={id}
          label={label}
          type={type}
          onChange={event => this.changeHandler(id, event)}
          onBlur={handleBlur}
          value={value}
          multiline={multiline}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
              error: classes.cssError,
              disabled: classes.cssDisabled,
            },
          }}
          inputProps={{autoComplete: autocomplete}}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              formControl: classes.cssFormControl,
              error: classes.cssError,
              disabled: classes.cssDisabled,
            },
          }}
        />
        <div
          className={[
            'admin-login-form__input__error-wrapper',
            spacing ? 'm-bot-28' : '',
          ].join(' ')}
        >
          <ErrorMessage
            className="admin-login-form__error"
            component="div"
            name={id}
          />
        </div>
      </Fragment>
    );
  }
}

FormTextField.propTypes = {
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
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  id: PropTypes.string,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  spacing: PropTypes.shape({
    margin: PropTypes.string,
  }),
  type: PropTypes.string,
  value: PropTypes.string,
};

export default withStyles(styles)(FormTextField);
