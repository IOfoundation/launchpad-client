import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

export const CancelAccount = props => {
  const {classes} = props;

  return (
    <div className="m-bot-40">
      <h2 className={classes.title}>{'Cancel Account'}</h2>
      <p className={classes.description}>
        {"Unhappy? We'll be sad to see you go."}
      </p>
      <button type="button" className={`btn btn__red ${classes.btn}`}>
        {'CLOSE MY ACCOUNT'}
      </button>
    </div>
  );
};

const styles = () => {
  return {
    title: {
      borderBottom: '2px solid black',
      color: 'black',
      fontFamily: '"proxima-nova-bold", Georgia, sans-serif',
      fontSize: '14px',
      lineHeight: '20px',
      marginBottom: '28px',
      paddingBottom: '8px',
    },
    description: {
      color: 'black',
      fontSize: '14px',
      lineHeight: '20px',
      marginBottom: '12px',
    },
    btn: {
      maxWidth: '250px',
    },
  };
};

CancelAccount.propTypes = {
  classes: PropTypes.shape({
    btn: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
  }),
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.shape({}),
  values: PropTypes.shape({}),
};

export default withStyles(styles)(CancelAccount);
