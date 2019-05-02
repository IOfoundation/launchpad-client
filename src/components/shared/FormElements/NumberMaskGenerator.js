import React from 'react';
import NumberFormat from 'react-number-format';
import {PropTypes} from 'prop-types';

export const AVAILABLE_MASKS = {
  phone: '(###) ###-####',
  USPhone: '(###) ###-####',
  CAPhone: '(###) ###-####',
  MXPhone: '##########',
  zipCode: '#####',
  date: '##/##/####',
  yearDays: '###',
};

const numberMaskGenerator = type => {
  const NumberMask = props => {
    const {inputRef, value, ...other} = props;
    if (type === 'currency') {
      return (
        <NumberFormat
          {...other}
          value={value}
          getInputRef={inputRef}
          thousandSeparator={true}
        />
      );
    }

    return (
      <NumberFormat
        {...other}
        value={value}
        getInputRef={inputRef}
        format={AVAILABLE_MASKS[type]}
        mask=""
      />
    );
  };

  NumberMask.propTypes = {
    inputRef: PropTypes.func,
    value: PropTypes.string,
  };

  return NumberMask;
};

export default numberMaskGenerator;
