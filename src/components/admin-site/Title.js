import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';

import Buttons from './Buttons';

const styles = () => {
  return {
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
    Container: PropTypes.string,
    Title: PropTypes.string,
  }),
  hideCancelAction: PropTypes.bool,
  submitClicked: PropTypes.func,
  submitLabel: PropTypes.string,
  titleText: PropTypes.string,
};

export default withStyles(styles)(Title);
