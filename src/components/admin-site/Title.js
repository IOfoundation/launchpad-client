import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';

const styles = () => {
  return {
    Buttons: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: '24px',
      '& .btn': {
        width: 'auto',
        padding: '9px 25px',
        fontSize: '14px',
        fontFamily: '"proxima-nova-semi", Georgia, sans-serif',
        margin: 0,
      },
      '& a': {
        color: '#7B7C7E',
      },
    },
    Container: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '2px solid black',
    },
    Title: {
      fontSize: '34px',
      lineHeight: '40px',
      fontFamily: '"proxima-nova-bold", Georgia, sans-serif',
      color: '#070709',
    },
  };
};

const Title = props => {
  const {classes} = props;

  return (
    <div className={classes.Container}>
      <h1 className={classes.Title}>{'Profile'}</h1>
      <div className={classes.Buttons}>
        <a className="title-as-link m-right-24">{'Cancel'}</a>
        <button className="btn btn__submit">{'Save Changes'}</button>
      </div>
    </div>
  );
};

Title.propTypes = {
  classes: PropTypes.shape({
    Buttons: PropTypes.string,
    Container: PropTypes.string,
    Title: PropTypes.string,
  }),
};

export default withStyles(styles)(Title);
