import React, {PureComponent} from 'react';
import Grid from '@material-ui/core/Grid';
import FormElement from '../../shared/FormElement/FormElement';

class SingInForm extends PureComponent {
  state = {
    signInForm: [
      {
        key: 'email',
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      {
        key: 'password',
        elementType: 'password',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    ],
    loading: false,
    formIsValid: false,
  };

  valueChangesHandler = (event, key) => {
    const newValue = event.target.value;

    this.setState(prevStatus => {
      const orderForm = prevStatus.orderForm.map(formElement => {
        if (formElement.key === key) {
          formElement.value = newValue;
          formElement.valid = checkValidity(newValue, formElement.validation);
          console.log(formElement);
        }
        return formElement;
      });

      const formIsValid = prevStatus.orderForm.every(
        formElement => formElement.valid || !formElement.validation
      );

      console.log(formIsValid);

      return {...orderForm, formIsValid};
    });
  };

  setFocus = key => {
    this.setState(prevStatus => {
      const orderForm = prevStatus.orderForm.map(formElement => {
        if (formElement.key === key) {
          formElement.touched = true;
          console.log('touched');
        }
        return formElement;
      });

      return {...orderForm};
    });
  };

  render() {
    const $formElements = this.state.signInForm.map((formElement, index) => {
      return (
        <FormElement
          key={index}
          elementType={formElement.elementType}
          elementConfig={formElement.elementConfig}
          valid={formElement.valid}
          shouldValidate={formElement.validation}
          value={formElement.value}
          valueChanges={event =>
            this.valueChangesHandler(event, formElement.key)
          }
          onFocused={() => this.setFocus(formElement.key)}
          touched={formElement.touched}
        />
      );
    });

    return (
      <Grid item={true} xs={12} md={4}>
        <form>
          {$formElements}
          <button>{'Sign In'}</button>
          <p>{'Forgot your password?'}</p>
        </form>
      </Grid>
    );
  }
}

export default SingInForm;
