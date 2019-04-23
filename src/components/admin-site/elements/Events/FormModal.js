import React from 'react';
import ModalUi from '@material-ui/core/Modal';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';

import FormWrapper from './FormWrapper';

const FormModal = props => {
  const {openModal, handlerModalVisibility, classes} = props;
  return (
    <ModalUi open={openModal} onClose={handlerModalVisibility}>
      <div className={classes.paper}>
        <i
          className="material-icons modal-events__close"
          onClick={handlerModalVisibility}
        >
          {'close'}
        </i>
        <FormWrapper closeClicked={handlerModalVisibility} />
      </div>
    </ModalUi>
  );
};

const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    left: '50%',
    maxHeight: '70vh',
    outline: 'none',
    overflow: 'auto',
    padding: '32px 24px',
    position: 'absolute',
    top: '45%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '930px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      boxSizing: 'border-box',
    },
  },
});

FormModal.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string,
  }),
  handlerModalVisibility: PropTypes.func,
  openModal: PropTypes.bool,
  selectedEvent: PropTypes.shape({}),
};

export default withStyles(styles)(FormModal);
