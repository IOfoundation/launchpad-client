import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import MUICheckbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {withStyles} from '@material-ui/core/styles';

const DEFAULT_VALUES = {
  true: true,
  false: false,
};

const styles = () => ({
  root: {
    '& input': {
      borderRadius: '0',
    },
  },
  checkboxRoot: {
    fontFamily: '"proxima-nova-regular", Georgia, sans-serif',
  },
  label: {
    paddingLeft: 0,
    fontFamily: '"proxima-nova-regular", Georgia, sans-serif',
    fontSize: '16px',
    lineHeight: '24px',
  },
  labelRoot: {
    fontFamily: '"proxima-nova-regular", Georgia, sans-serif',
    paddingLeft: 0,
    position: 'relative',
    fontSize: '16px',
    lineHeight: '24px',
    width: '100%',
  },
});

export class Checkbox extends PureComponent {
  _handleChange = ({target: {checked}}) => {
    const {
      name,
      onChange,
      field = {},
      values = DEFAULT_VALUES,
      maxPicks,
      handlerModalVisibility,
    } = this.props;
    const inputName = name || field.name;
    const inputOnChange = onChange || field.onChange;

    if (maxPicks) {
      if (values[checked]) {
        handlerModalVisibility();
      } else {
        inputOnChange(
          {target: {name: inputName, value: values[checked]}},
          !values[checked]
        );
      }
    } else {
      inputOnChange({target: {name: inputName, value: values[checked]}});
    }
  };

  render() {
    const {
      label,
      name,
      value,
      field = {},
      dataTest = '',
      values = DEFAULT_VALUES,
      disabled = false,
      classes,
    } = this.props;

    const inputName = name || field.name;
    const inputValue = value || field.value || false;
    const isChecked = values.true === inputValue;

    return (
      <FormControlLabel
        control={
          <MUICheckbox
            checked={isChecked}
            onChange={this._handleChange}
            value={inputName}
            color="primary"
            data-test={dataTest}
            classes={{root: classes.checkboxRoot}}
          />
        }
        label={label}
        classes={{
          root: `${classes.labelRoot} ${classes.root}`,
          label: classes.label,
        }}
        disabled={disabled}
      />
    );
  }
}

Checkbox.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    label: PropTypes.string,
    checkboxRoot: PropTypes.string,
    labelRoot: PropTypes.string,
  }),
  dataTest: PropTypes.string,
  disabled: PropTypes.bool,
  field: PropTypes.shape({}),
  handlerModalVisibility: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  maxPicks: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  values: PropTypes.shape({}),
};

export default withStyles(styles)(Checkbox);
