import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
  };
};

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
      <Grid item={true}>
        <i className="material-icons">{'location_on'}</i>
      </Grid>
      <Grid item={true}>{name}</Grid>
      <Grid item={true} xs={8}>
        {address}
      </Grid>
    </Grid>
  );
};

Item.propTypes = {
  address: PropTypes.string,
  classes: PropTypes.shape({
    item: PropTypes.string,
  }),
  clicked: PropTypes.func,
  name: PropTypes.string,
};

export default withStyles(styles)(Item);
