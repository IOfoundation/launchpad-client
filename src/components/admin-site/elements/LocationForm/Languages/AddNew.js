import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {sharedStyles} from '../styles';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import {combineStyles} from '@Utils';
import {languages} from '@StaticData/data';

class AddNew extends PureComponent {
  state = {
    language: '',
  };

  updateValue = event => {
    const {handleChange, arrayHelpers} = this.props;
    const info = event.target;

    if (info.value) {
      handleChange(event);
      this.setState({[event.target.name]: info.value});
      arrayHelpers.push(info.value);
    }
  };

  render() {
    const {classes, errors} = this.props;

    return (
      <FormControl className={classes.formControl} style={{minWidth: '100%'}}>
        <InputLabel htmlFor={'language-options'}>
          {'Select One or More Languages'}
        </InputLabel>
        <Select
          errors={errors}
          open={this.state.open}
          value=""
          onChange={this.updateValue}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          inputProps={{
            name: 'language',
            id: 'language-options',
            classes: {
              icon: classes.icon,
            },
          }}
        >
          {languages.map(language => (
            <MenuItem key={language.code} value={language.name}>
              {language.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

const styles = () => ({
  icon: {
    color: '#272729',
  },
});

AddNew.propTypes = {
  arrayHelpers: PropTypes.shape({}),
  classes: PropTypes.shape({
    formControl: PropTypes.string,
    icon: PropTypes.string,
  }),
  errors: PropTypes.shape({}),
  handleChange: PropTypes.func,
};

export default withStyles(combineStyles(sharedStyles, styles))(AddNew);
