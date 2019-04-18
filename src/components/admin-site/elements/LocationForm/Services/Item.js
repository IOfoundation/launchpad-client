import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {sharedStyles, sharedClasses} from '../styles';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

class Item extends PureComponent {
  state = {
    labelWidth: 0,
    anchorEl: null,
  };

  handleMenuClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleMenuClose = () => {
    this._indexMenuOpen = null;
    this.setState({anchorEl: null});
  };

  handleMenuCloseAndDelete = () => {
    const {arrayHelpers, id} = this.props;

    this.setState({anchorEl: null});
    arrayHelpers.remove(id);
  };

  render() {
    const {service, id, classes} = this.props;
    const {anchorEl} = this.state;

    return (
      <div className={classes.serviceSelected}>
        <span>
          {service.name}
          {service.id}
        </span>
        <i
          className="material-icons item-dropdown"
          aria-owns={anchorEl ? 'service-menu-item' : null}
          aria-haspopup="true"
          onClick={this.handleMenuClick}
        >
          {'keyboard_arrow_down'}
        </i>
        <Menu
          id={id}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuClose}>{'View'}</MenuItem>
          {/* <MenuItem onClick={this.handleMenuCloseAndDelete}>
            {'Remove'}
          </MenuItem> */}
        </Menu>
      </div>
    );
  }
}

Item.propTypes = {
  arrayHelpers: PropTypes.shape({}),
  classes: sharedClasses,
  handleChange: PropTypes.func,
  id: PropTypes.number,
  service: PropTypes.shape({name: PropTypes.string, id: PropTypes.number}),
};

export default withStyles(sharedStyles)(Item);
