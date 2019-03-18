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
    } = this.props;
    let InputLabelProps = null;
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

    if (type === 'time') {
      InputLabelProps = {
        shrink: true,
      };
    }

    if (novalidate) {
      displayError = null;
    }

    if (type === 'time') {
      InputLabelProps = {
        shrink: true,
      };
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
          inputProps={{
            autoComplete: autocomplete,
            step: 300,
          }}
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
  type: PropTypes.string,
  value: PropTypes.string,
};

export default FormTextFieldDefault;
