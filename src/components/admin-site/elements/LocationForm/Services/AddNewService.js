import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {sharedStyles, sharedClasses} from '../styles';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class AddNewService extends PureComponent {
  state = {
    service: '',
    open: false,
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  updateValue = event => {
    const {handleChange, arrayHelpers} = this.props;
    const info = event.target;

    handleChange(event);
    this.setState({[event.target.name]: info.value});
    arrayHelpers.push({id: info.value, name: info.name});
  };

  render() {
    const {classes} = this.props;

    return (
      <FormControl className={classes.formControl}>
        <div className={classes.hideSelect}>
          <button
            className={`btn btn__submit front ${classes.floating} ${
              classes.front
            }`}
            onClick={this.handleOpen}
          >
            {'Add Another Service'}
          </button>
          <Select
            open={this.state.open}
            value={this.state.service}
            onChange={this.updateValue}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            inputProps={{
              name: 'service',
              id: 'service-options',
            }}
            className={`${classes.floating} ${classes.back}`}
          >
            <MenuItem value="">
              <em>{'None'}</em>
            </MenuItem>
            <MenuItem value={10}>{'Service One'}</MenuItem>
            <MenuItem value={20}>{'Service Two'}</MenuItem>
            <MenuItem value={30}>{'Service Three'}</MenuItem>
          </Select>
        </div>
      </FormControl>
    );
  }
}

AddNewService.propTypes = {
  arrayHelpers: PropTypes.shape({}),
  classes: sharedClasses,
  handleChange: PropTypes.func,
};

export default withStyles(sharedStyles)(AddNewService);
