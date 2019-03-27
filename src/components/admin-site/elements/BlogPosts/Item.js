import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
    const info = event.target;

    this.setState({[event.target.name]: info.value});
  };

  render() {
    const {title, description, label, date, category, classes} = this.props;

    return (
      <div className={classes.container}>
        <h3 className={classes.title}>{title}</h3>
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
              className={`${classes.floating} ${classes.back}`}
            >
              <MenuItem value="Edit">{'Edit'}</MenuItem>
              <MenuItem value="Delete">{'Delete'}</MenuItem>
            </Select>
          </div>

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
    floating: {
      position: 'absolute',
      top: 0,
      left: 0,
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
    label: PropTypes.string,
    title: PropTypes.string,
  }),
  date: PropTypes.string,
  description: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
};

export default withStyles(styles)(Item);
