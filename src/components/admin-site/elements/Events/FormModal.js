import React from 'react';
import ModalUi from '@material-ui/core/Modal';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';

import FormWrapper from './FormWrapper';
import Loading from '@Shared/Loading';

const FormModal = props => {
  const {
    openModal,
    handlerModalVisibility,
    classes,
    refreshData,
    selectedEvent,
    dataLoading,
  } = props;
  let form = <Loading />;

  if (!dataLoading) {
    form = (
      <FormWrapper
        closeClicked={handlerModalVisibility}
        refreshData={refreshData}
        selectedEvent={selectedEvent}
      />
    );
  }

  return (
    <ModalUi open={openModal} onClose={handlerModalVisibility}>
      <div className={classes.paper}>
        <i
          className="material-icons modal-events__close"
          onClick={handlerModalVisibility}
        >
          {'close'}
        </i>
        {form}
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
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: '32px 24px',
    position: 'absolute',
    top: '45%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '930px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
});

FormModal.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string,
  }),
  dataLoading: PropTypes.bool,
  handlerModalVisibility: PropTypes.func,
  openModal: PropTypes.bool,
  refreshData: PropTypes.func,
  selectedEvent: PropTypes.shape({}),
};

export default withStyles(styles)(FormModal);
