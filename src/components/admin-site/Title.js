import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Buttons from './Buttons';

const Title = props => {
  const {
    classes,
    titleText,
    submitLabel,
    hideCancelAction,
    submitClicked,
    cancelClicked,
  } = props;

  return (
    <Grid
      className={classes.Container}
      container={true}
      justify="space-between"
    >
      <Grid item={true} xs={12} md={5}>
        <h1 className={classes.Title}>{titleText}</h1>
      </Grid>
      <Grid item={true} xs={12} md={7}>
        <Buttons
          submitLabel={submitLabel}
          hideCancelAction={hideCancelAction}
          submitClicked={submitClicked}
          cancelClicked={cancelClicked}
        />
      </Grid>
    </Grid>
  );
};

const styles = theme => {
  return {
    Buttons: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: '28px',
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
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'flex-start',
      },
    },
    Container: {
      borderBottom: '2px solid black',
      marginBottom: '28px',
    },
    Title: {
      fontSize: '34px',
      lineHeight: '40px',
      fontFamily: '"proxima-nova-bold", Georgia, sans-serif',
      color: '#070709',
      [theme.breakpoints.down('sm')]: {
        marginBottom: '16px',
      },
    },
  };
};

Title.propTypes = {
  cancelClicked: PropTypes.func,
  classes: PropTypes.shape({
    Buttons: PropTypes.string,
    Container: PropTypes.string,
    Title: PropTypes.string,
  }),
  hideCancelAction: PropTypes.bool,
  submitClicked: PropTypes.func,
  submitLabel: PropTypes.string,
  titleText: PropTypes.string,
};

export default withStyles(styles)(Title);