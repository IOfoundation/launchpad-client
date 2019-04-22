import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const Item = props => {
  const {name, address, clicked, classes} = props;
  return (
    <Grid
      container={true}
      spacing={16}
      className={classes.item}
      alignContent={'center'}
      alignItems={'center'}
      onClick={clicked}
    >
      <Grid item={true} className={classes.icon}>
        <i className="material-icons">{'location_on'}</i>
      </Grid>
      <Grid item={true} className={classes.name}>
        {name}
      </Grid>
      <Grid item={true} className={classes.address}>
        {address}
      </Grid>
    </Grid>
  );
};

const styles = () => {
  return {
    item: {
      background: '#EAECF0',
      color: 'black',
      cursor: 'pointer',
      height: '75px',
      marginBottom: '16px',
      padding: '16px',
      '&:hover': {
        background: '#ddf2f0',
      },
    },
    icon: {
      padding: '0 !important',
      height: '23px',
    },
    address: {
      color: '#6F7073',
      fontSize: '14px',
      lineHeight: '28px',
      padding: '3px 0 0 !important',
    },
    name: {
      color: '#070709',
      fontSize: '20px',
      lineHeight: '28px',
      padding: '0 8px !important',
    },
  };
};

Item.propTypes = {
  address: PropTypes.string,
  classes: PropTypes.shape({
    address: PropTypes.string,
    item: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string,
  }),
  clicked: PropTypes.func,
  name: PropTypes.string,
};

export default withStyles(styles)(Item);
