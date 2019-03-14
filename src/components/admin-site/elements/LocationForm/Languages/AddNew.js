import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {sharedStyles, sharedClasses} from '../styles';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

class AddNew extends PureComponent {
  state = {
    language: '',
  };

  updateValue = event => {
    const {handleChange, arrayHelpers} = this.props;
    const info = event.target;

    handleChange(event);
    this.setState({[event.target.name]: info.value});
    arrayHelpers.push(info.value);
  };

  render() {
    const {classes} = this.props;

    return (
      <FormControl className={classes.formControl} style={{minWidth: '100%'}}>
        <InputLabel htmlFor={'language-options'}>
          {'Select One or More Languages'}
        </InputLabel>
        <Select
          open={this.state.open}
          value={this.state.language}
          onChange={this.updateValue}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          inputProps={{
            name: 'language',
            id: 'language-options',
          }}
        >
          <MenuItem value="">
            <em>{'None'}</em>
          </MenuItem>
          <MenuItem value={'Language One'}>{'Language One'}</MenuItem>
          <MenuItem value={'Language Two'}>{'Language Two'}</MenuItem>
          <MenuItem value={'Language Three'}>{'Language Three'}</MenuItem>
        </Select>
      </FormControl>
    );
  }
}

AddNew.propTypes = {
  arrayHelpers: PropTypes.shape({}),
  classes: sharedClasses,
  handleChange: PropTypes.func,
};

export default withStyles(sharedStyles)(AddNew);
