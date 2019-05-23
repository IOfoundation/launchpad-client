import React from 'react';
import {PropTypes} from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import ItemMenuOptions from './ItemMenuOptions';

const ItemSelect = ({
  classes,
  handleOpen,
  handleClose,
  updateValue,
  open,
  option,
}) => {
  return (
    <div className={classes.hideSelect}>
      <i
        className={`material-icons ${classes.floating} ${classes.front}`}
        onClick={handleOpen}
      >
        {'keyboard_arrow_down'}
      </i>
      <Select
        open={open}
        value={option}
        onChange={updateValue}
        onClose={handleClose}
        onOpen={handleOpen}
        inputProps={{
          name: 'service',
          id: 'service-options',
          classes: {
            icon: classes.icon,
          },
        }}
        MenuProps={{
          MenuListProps: {
            classes: {
              root: classes.rootMenuListCss,
            },
          },
        }}
        className={`${classes.floating} ${classes.back}`}
      >
        {Object.keys(ItemMenuOptions).map(itemOption => (
          <MenuItem
            key={itemOption}
            value={itemOption}
            className={classes.menuListCss}
          >
            {itemOption}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

ItemSelect.propTypes = {
  classes: PropTypes.shape({
    category: PropTypes.string,
    container: PropTypes.string,
    date: PropTypes.string,
    dateContainer: PropTypes.string,
    description: PropTypes.string,
    disable: PropTypes.string,
    label: PropTypes.string,
    menuListCss: PropTypes.string,
    rootMenuListCss: PropTypes.string,
    title: PropTypes.string,
    floatingDate: PropTypes.string,
    url: PropTypes.string,
  }),
  handleClose: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  open: PropTypes.bool,
  option: PropTypes.string,
  updateValue: PropTypes.func.isRequired,
};

export default ItemSelect;
