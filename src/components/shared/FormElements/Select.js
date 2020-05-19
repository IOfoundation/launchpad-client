import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {ErrorMessage} from 'formik';
import {withStyles} from '@material-ui/core/styles';

const styles = () => ({
  icon: {
    color: '#272729',
  },
});

class SelectElement extends PureComponent {
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
      classes,
      displayEmpty,
      error,
      handleBlur,
      helperText,
      id,
      label,
      marginBottom,
      novalidate,
      selectOptions,
      value,
    } = this.props;
    let Options = [
      <MenuItem value="" key={1}>
        <em>{'Select One'}</em>
      </MenuItem>,
      <MenuItem value={'Option One'} key={2}>
        {'Option One'}
      </MenuItem>,
      <MenuItem value={'Option Two'} key={3}>
        {'Option Two'}
      </MenuItem>,
      <MenuItem value={'Option Three'} key={4}>
        {'Option Three'}
      </MenuItem>,
    ];
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
          name={id}
        />
      </div>
    );

    if (novalidate) {
      displayError = null;
    }

    if (selectOptions) {
      Options = selectOptions.map(data => {
        return (
          <MenuItem key={data.value} value={data.value}>
            {data.name}
          </MenuItem>
        );
      });
    }

    return (
      <FormControl style={{minWidth: '100%'}}>
        <InputLabel htmlFor={id} style={{minWidth: '300px'}}>
          {label}
        </InputLabel>
        <Select
          id={id}
          error={error}
          value={value}
          displayEmpty={displayEmpty}
          onChange={event => this.changeHandler(id, event)}
          onBlur={handleBlur}
          inputProps={{
            name: id,
            id,
            classes: {
              icon: classes.icon,
            },
          }}
        >
          {Options}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {displayError}
      </FormControl>
    );
  }
}

SelectElement.propTypes = {
  autocomplete: PropTypes.string,
  classes: PropTypes.shape({
    icon: PropTypes.string,
  }),
  displayEmpty: PropTypes.bool,
  error: PropTypes.bool,
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  helperText: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  marginBottom: PropTypes.bool,
  multiline: PropTypes.bool,
  novalidate: PropTypes.bool,
  selectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ),
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
};

export default withStyles(styles)(SelectElement);
