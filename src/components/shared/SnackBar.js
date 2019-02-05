import React from 'react';
import {Snackbar} from 'material-ui';

const SnackbarUI = props => {
  const {
    open,
    message,
    action,
    autoHideDuration,
    handleActionClick,
    handleRequestClose,
  } = props;

  return (
    <Snackbar
      open={open}
      message={message}
      action={action}
      autoHideDuration={autoHideDuration}
      onActionClick={handleActionClick}
      onRequestClose={handleRequestClose}
    />
  );
};

export default SnackbarUI;
