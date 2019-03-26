import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';

import Buttons from './Buttons';

const styles = () => {
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
    },
    Container: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '2px solid black',
      marginBottom: '28px',
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
  const {
    classes,
    titleText,
    submitLabel,
    hideCancelAction,
    submitClicked,
    cancelClicked,
  } = props;

  return (
    <div className={classes.Container}>
      <h1 className={classes.Title}>{titleText}</h1>
      <Buttons
        submitLabel={submitLabel}
        hideCancelAction={hideCancelAction}
        submitClicked={submitClicked}
        cancelClicked={cancelClicked}
      />
    </div>
  );
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
