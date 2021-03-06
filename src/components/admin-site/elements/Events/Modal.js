import React from 'react';
import ModalUi from '@material-ui/core/Modal';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';

import Content from './Content';

const getAddress = ({street_1, street_2, state_abbr, city, zip}) => {
  let address = '';

  if (street_2) {
    address = `${street_1}, ${street_2}, ${city}, ${state_abbr}, ${zip}`;
  } else {
    address = `${street_1}, ${city}, ${state_abbr}, ${zip}`;
  }

  return address;
};

const Modal = props => {
  const {openModal, handlerModalVisibility, selectedEvent, classes} = props;

  return (
    <ModalUi open={openModal} onClose={handlerModalVisibility}>
      <div className={classes.paper}>
        <Content
          title={selectedEvent.title}
          postedBy={selectedEvent.organization}
          start={selectedEvent.starting_at}
          end={selectedEvent.ending_at}
          address={getAddress(selectedEvent)}
          link={selectedEvent.external_url}
          description={selectedEvent.body}
          closed={handlerModalVisibility}
        />
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
    width: theme.spacing.unit * 70,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      boxSizing: 'border-box',
    },
  },
});

Modal.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string,
  }),
  handlerModalVisibility: PropTypes.func,
  openModal: PropTypes.bool,
  selectedEvent: PropTypes.shape({}),
};

export default withStyles(styles)(Modal);
