import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Colors} from '@Styles/Colors';

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

  handleMenuClose = event => {
    const {optionSelected} = this.props;

    this._indexMenuOpen = null;
    this.setState({anchorEl: null});

    if (event.target.value === 0) {
      optionSelected();
    }
  };

  render() {
    const {service, id, classes} = this.props;
    const {anchorEl} = this.state;

    return (
      <div className={classes.serviceSelected}>
        <span>{service.name}</span>
        <i
          className={`material-icons ${classes.icon}`}
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
          MenuListProps={{
            classes: {
              root: classes.rootMenuListCss,
            },
          }}
        >
          <MenuItem
            onClick={this.handleMenuClose}
            className={classes.menuListCss}
          >
            {'View'}
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

const styles = () => {
  return {
    serviceSelected: {
      color: 'black',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px',
      '& span': {
        marginRight: '8px',
      },
    },
    rootMenuListCss: {
      borderRadius: '3px',
      padding: 0,
    },
    menuListCss: {
      fontSize: '16px',
      lineHeight: '24px',
      width: '88px',
      cursor: 'pointer',
    },
    icon: {
      cursor: 'pointer',
      '&:hover': {
        color: Colors.green,
      },
    },
  };
};

Item.propTypes = {
  arrayHelpers: PropTypes.shape({}),
  classes: PropTypes.shape({
    serviceSelected: PropTypes.string,
    rootMenuListCss: PropTypes.string,
    menuListCss: PropTypes.string,
  }),
  handleChange: PropTypes.func,
  id: PropTypes.number,
  optionSelected: PropTypes.func,
  service: PropTypes.shape({name: PropTypes.string, id: PropTypes.number}),
};

export default withStyles(styles)(Item);
