import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {truncate} from '@Utils';
import {Colors} from '@Styles/Colors';
import ItemMenuOptions from './ItemMenuOptions';

class Item extends PureComponent {
  state = {
    option: '',
    open: false,
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  updateValue = event => {
    const {optionSelected} = this.props;
    const info = event.target;

    this.setState({[event.target.name]: info.value});
    optionSelected(info.value);
  };

  render() {
    const {
      title,
      description,
      label,
      date,
      category,
      classes,
      start,
      url,
      disable,
      urlClicked,
      titleClicked,
    } = this.props;
    const containerClasses = [classes.container];
    let truncateUrl = url;
    let selectElement = (
      <div className={classes.hideSelect}>
        <i
          className={`material-icons ${classes.floating} ${classes.front}`}
          onClick={this.handleOpen}
        >
          {'keyboard_arrow_down'}
        </i>
        <Select
          open={this.state.open}
          value={this.state.option}
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
          MenuProps={{
            MenuListProps: {
              classes: {
                root: classes.rootMenuListCss,
              },
            },
          }}
          className={`${classes.floating} ${classes.back}`}
        >
          {Object.keys(ItemMenuOptions).map(option => (
            <MenuItem
              key={option}
              value={option}
              className={classes.menuListCss}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
    );

    if (truncateUrl && truncateUrl.split('').length > 70) {
      truncateUrl = truncate(label, 70);
    }

    if (disable) {
      selectElement = null;
      containerClasses.push(classes.disable);
    }

    return (
      <div className={containerClasses.join(' ')}>
        <div className="clearfix">
          <h3
            className={`${classes.title} title-as-link`}
            onClick={titleClicked}
          >
            {title}
          </h3>
          <div className={classes.floatingDate}>{start}</div>
        </div>

        <p
          href={url}
          onClick={urlClicked}
          className={`title-as-link title-as-link--small title-as-link--decoration ${
            classes.url
          }`}
        >
          {truncateUrl}
        </p>
        <p className={classes.description}>{description}</p>
        <Grid
          container={true}
          className={classes.dateContainer}
          justify="flex-start"
          alignItems="center"
        >
          <Grid className={classes.label}>{label}</Grid>
          <Grid className={classes.date}>
            <span>{date}</span>
          </Grid>
          {selectElement}
          <Grid className={classes.category}>{category}</Grid>
        </Grid>
      </div>
    );
  }
}

const styles = theme => {
  return {
    container: {
      borderBottom: '1px solid black',
      color: 'black',
      marginBottom: '24px',
      paddingBottom: '24px',
    },
    title: {
      fontFamily: theme.fonts.bold,
      fontSize: '16px',
      lineHeight: '24px',
      marginBottom: '8px',
      float: 'left',
    },
    description: {
      color: '#7B7C7E',
      fontSize: '14px',
      lineHeight: '20px',
      marginBottom: '8px',
    },
    dateContainer: {
      fontSize: '12px',
      lineHeight: '16px',
    },
    label: {
      fontFamily: theme.fonts.bold,
      marginRight: '4px',
    },
    category: {
      fontFamily: theme.fonts.bold,
      textTransform: 'capitalize',
    },
    date: {
      marginRight: '4px',
    },
    hideSelect: {
      height: '24px',
      marginRight: '16px',
      position: 'relative',
      width: '24px',
    },
    front: {
      cursor: 'pointer',
      zIndex: '2',
      '&:hover': {
        color: '#00a472',
      },
    },
    back: {
      visility: 'hidden',
      opacity: '0',
      zIndex: '1',
    },
    rootMenuListCss: {
      borderRadius: '3px',
      padding: 0,
    },
    menuListCss: {
      fontSize: '16px',
      lineHeight: '24px',
      width: '88px',
    },
    floatingDate: {
      float: 'right',
      lineHeight: '24px',
    },
    disable: {
      '& a': {
        color: Colors.gray.disable,
      },
      '& $floatingDate': {
        color: Colors.gray.disable,
      },
      '& $title': {
        color: Colors.gray.disable,
        '&:hover': {
          color: Colors.green,
        },
      },
      '& $description': {
        color: Colors.gray.description,
      },
      '& $url': {
        color: Colors.gray.disable,
        '&:hover': {
          color: Colors.green,
        },
      },
    },
    url: {
      marginBottom: '8px',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
        width: '150px',
      },
    },
  };
};

Item.propTypes = {
  category: PropTypes.string,
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
  date: PropTypes.string,
  description: PropTypes.string,
  disable: PropTypes.bool,
  label: PropTypes.string,
  optionSelected: PropTypes.func,
  start: PropTypes.string,
  title: PropTypes.string,
  titleClicked: PropTypes.func,
  url: PropTypes.string,
  urlClicked: PropTypes.func,
};

export default withStyles(styles)(Item);
