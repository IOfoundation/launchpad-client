import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {sharedStyles} from '../styles';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {combineStyles} from '../../../../../utils';

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
    const {classes, createServiceDisable} = this.props;

    return (
      <FormControl className={classes.formControl}>
        <div className={classes.hideSelect}>
          <button
            className={`btn btn__submit front ${classes.floating} ${
              classes.front
            }`}
            onClick={this.handleOpen}
            disabled={createServiceDisable}
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
              classes: {
                icon: classes.icon,
              },
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

const styles = () => ({
  icon: {
    color: '#272729',
  },
  message: {
    color: 'black',
  },
});

AddNewService.propTypes = {
  arrayHelpers: PropTypes.shape({}),
  classes: PropTypes.shape({
    formControl: PropTypes.string,
    hideSelect: PropTypes.string,
    floating: PropTypes.string,
    front: PropTypes.string,
    back: PropTypes.string,
    icon: PropTypes.string,
    message: PropTypes.string,
  }),
  createServiceDisable: PropTypes.bool,
  handleChange: PropTypes.func,
};

export default withStyles(combineStyles(sharedStyles, styles))(AddNewService);
