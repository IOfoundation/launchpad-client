import React, {Fragment, PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import {ErrorMessage} from 'formik';

const styles = () => ({
  cssLabel: {
    color: '#8E8F92',
    fontSize: '34px',
    lineHeight: '40px',
    fontFamily: '"proxima-nova-regular", Georgia, sans-serif',
  },
  cssOutlinedInput: {
    '&$cssFocused': {
      borderColor: '#E9EAEB',
    },
    '&:after, &:hover:before': {
      borderColor: '#E9EAEB',
    },
    '&:hover:not($cssDisabled):not($cssError):before': {
      borderBottom: '2px solid rgba(233, 234, 235, 0.7) !important',
    },
    '&:before': {
      borderColor: '#E9EAEB',
    },
    fontFamily: "'proxima-nova-regular', Georgia, sans-serif",
  },
  cssDisabled: {},
  cssFocused: {
    color: 'black',
    '&$cssLabel': {
      color: 'black',
    },
  },
  cssFormControl: {
    color: 'black',
    fontSize: '34px',
    lineHeight: '40px',
  },
  cssError: {
    color: '#D61600 !important',
  },
});

class TitleField extends PureComponent {
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
      marginBottom,
      multiline,
      type = 'text',
      value,
    } = this.props;

    return (
      <Fragment>
        <TextField
          error={error}
          fullWidth={true}
          id={id}
          type={type}
          placeholder={label}
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
            marginBottom ? 'm-bot-24' : '',
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

TitleField.propTypes = {
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
  marginBottom: PropTypes.bool,
  multiline: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default withStyles(styles)(TitleField);
