import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ModalUi from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';

const Modal = props => {
  const {
    classes,
    modalClosed,
    open,
    activeClicked,
    cancelClicked,
    statusPicked,
    schemaFail,
    schemaValidated,
  } = props;
  let button, title, alert, cancel;

  if (schemaValidated) {
    button = (
      <button
        className={`btn btn__red p-x-24 ${classes.btn}`}
        onClick={activeClicked}
      >
        {'Unpublish'}
      </button>
    );
    title = 'Are you sure you want to publish your organization?';
    alert = 'It will no longer be visible.';
    cancel = (
      <button
        className={`btn btn__outline p-x-24 ${classes.btn}`}
        onClick={cancelClicked}
      >
        {'Cancel'}
      </button>
    );

    if (statusPicked) {
      button = (
        <button
          className={`btn btn__green p-x-24 ${classes.btn}`}
          onClick={activeClicked}
        >
          {'Publish'}
        </button>
      );
      title = 'Are you sure you want to unpublish your organization?';
      alert = 'It will become visible.';
    }
  } else if (schemaFail) {
    button = (
      <button
        className={`btn btn__green p-x-24 ${classes.btn}`}
        onClick={activeClicked}
      >
        {'OK'}
      </button>
    );
    title =
      'The organization cannot be published until the required fields are completed.';
  }

  return (
    <ModalUi open={open} onClose={modalClosed}>
      <div className={classes.modal}>
        <h2 className={classes.title}>{title}</h2>
        <p className={`text-bold ${classes.alert}`}>{alert}</p>
        <Grid container={true} justify={'flex-end'}>
          <Grid item={true}>{cancel}</Grid>
          <Grid item={true}>{button}</Grid>
        </Grid>
      </div>
    </ModalUi>
  );
};

const styles = theme => ({
  alert: {
    fontSize: '24px',
    lineHeight: '36px',
    marginBottom: '16px',
  },
  modal: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    left: '50%',
    maxHeight: '200px',
    outline: 'none',
    overflow: 'auto',
    padding: '24px 28px',
    position: 'absolute',
    top: '45%',
    transform: 'translate(-50%, -50%)',
    width: '368px',
  },
  btn: {
    padding: '8px 18px',
  },
  title: {
    fontSize: '24px',
    lineHeight: '36px',
  },
});

Modal.propTypes = {
  activeClicked: PropTypes.func,
  cancelClicked: PropTypes.func,
  classes: PropTypes.shape({
    btn: PropTypes.string,
    modal: PropTypes.string,
    title: PropTypes.string,
    alert: PropTypes.string,
  }),
  modalClosed: PropTypes.func,
  open: PropTypes.bool,
  schemaFail: PropTypes.bool,
  schemaValidated: PropTypes.bool,
  statusPicked: PropTypes.bool,
  yupActions: PropTypes.shape({
    validateSchema: PropTypes.func,
  }),
};

export default withStyles(styles)(Modal);
