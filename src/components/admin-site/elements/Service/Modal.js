import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ModalUi from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';

const Modal = props => {
  const {classes, modalClosed, open, deleteClicked, cancelClicked} = props;

  return (
    <ModalUi open={open} onClose={modalClosed}>
      <div className={classes.modal}>
        <h2 className={classes.title}>
          {'Are you sure you want to delete this service?'}
        </h2>
        <Grid container={true} justify={'flex-end'}>
          <Grid item={true}>
            <button
              className={`btn btn__outline p-x-24 ${classes.btn}`}
              onClick={deleteClicked}
            >
              {'Yes, Delete It.'}
            </button>
          </Grid>
          <Grid item={true}>
            <button
              className={`btn btn__black p-x-24 ${classes.btn}`}
              onClick={cancelClicked}
            >
              {'Cancel'}
            </button>
          </Grid>
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
  cancelClicked: PropTypes.func,
  classes: PropTypes.shape({
    btn: PropTypes.string,
    modal: PropTypes.string,
    title: PropTypes.string,
    alert: PropTypes.string,
  }),
  deleteClicked: PropTypes.func,
  modalClosed: PropTypes.func,
  open: PropTypes.bool,
};

export default withStyles(styles)(Modal);
