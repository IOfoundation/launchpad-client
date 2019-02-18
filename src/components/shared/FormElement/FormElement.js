import React from 'react';

const FormElement = props => {
  let $formElement = null;
  const inputClasses = ['form-element__element'];

  if (!props.valid && props.shouldValidate && props.touched) {
    inputClasses.push('form-element__element--error');
  }

  switch (props.elementType) {
    case 'input':
      $formElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.valueChanges}
          onFocus={props.onFocused}
        />
      );
      break;
    case 'textarea':
      $formElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.valueChanges}
          onFocus={props.onFocused}
        />
      );
      break;
    case 'select':
      $formElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.valueChanges}
          onFocus={props.onFocused}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      break;
    default:
      $formElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.valueChanges}
          onFocus={props.onFocused}
        />
      );
  }

  return (
    <div className="form-element">
      <label className="form-element__label">{props.label}</label>
      {$formElement}
    </div>
  );
};

export default FormElement;
