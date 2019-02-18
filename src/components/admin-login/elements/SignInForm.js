import React, {PureComponent} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';

class SingInForm extends PureComponent {
  state = {
    initialValues: {email: '', password: ''},
  };

  submitHandler = (values, {setSubmitting}) => {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

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
      values: {email, password},
      errors,
      touched,
      handleSubmit,
      isValid,
      handleBlur,
      isSubmitting,
    } = this.props;

    return (
      <Form className="admin-login-form" onSubmit={handleSubmit}>
        <TextField
          className="admin-login-form__input"
          error={touched.email && Boolean(errors.email)}
          fullWidth={true}
          id="email"
          label="email"
          margin="normal"
          onChange={event => this.changeHandler('email', event)}
          onBlur={handleBlur}
          value={email}
        />
        <div className="admin-login-form__input__error-wrapper">
          <ErrorMessage
            className="admin-login-form__error"
            component="div"
            name="email"
          />
        </div>
        <TextField
          className="admin-login-form__input"
          error={touched.password && Boolean(errors.password)}
          fullWidth={true}
          id="password"
          label="password"
          onChange={event => this.changeHandler('password', event)}
          value={password}
          onBlur={handleBlur}
        />
        <div className="admin-login-form__input__error-wrapper">
          <ErrorMessage
            className="admin-login-form__error"
            component="div"
            name="password"
          />
        </div>
        <button type="submit" disabled={!isValid || isSubmitting}>
          Submit
        </button>
      </Form>
    );
  }
}

export default SingInForm;
