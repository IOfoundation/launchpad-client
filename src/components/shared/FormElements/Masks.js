import numberMaskGenerator from './NumberMaskGenerator';

const Masks = {
  USPhone: numberMaskGenerator('USPhone'),
  CAPhone: numberMaskGenerator('CAPhone'),
  MXPhone: numberMaskGenerator('MXPhone'),
  phone: numberMaskGenerator('phone'),
  zipCode: numberMaskGenerator('zipCode'),
  date: numberMaskGenerator('date'),
  yearDays: numberMaskGenerator('yearDays'),
  currency: numberMaskGenerator('currency'),
  default: 'input',
};

export default Masks;
