import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import Content from './Modal/Content';
import Jumbotron from './Jumbotron';
import FeaturedEvents from './FeaturedEvents/FeaturedEvents';
import SchedulerContainer from './SchedulerContainer';

import * as eventActions from '@Actions/events';

class Events extends PureComponent {
  state = {
    selectedEvent: {},
    openModal: false,
  };

  handlerModalVisibility = modalInformation => {
    this.setState(prevState => {
      if (modalInformation) {
        return {
          selectedEvent: modalInformation,
          openModal: !prevState.openModal,
        };
      }

      return {
        openModal: !prevState.openModal,
      };
    });
  };

  render() {
    const {
      breakpoint,
      actions,
      featuredEvents,
      eventsByMonth,
      classes,
    } = this.props;
    const {openModal, selectedEvent} = this.state;

    return (
      <div className="events-container">
        <Modal open={openModal} onClose={this.handlerModalVisibility}>
          <div className={classes.paper}>
            <Content
              title={selectedEvent.title}
              postedBy={selectedEvent.organization}
              start={selectedEvent.starting_at}
              end={selectedEvent.ending_at}
              address={`${selectedEvent.street_1}, ${selectedEvent.street_2}, ${
                selectedEvent.state_abbr
              }, ${selectedEvent.zip}`}
              link={selectedEvent.external_url}
              description={selectedEvent.body}
              closed={this.handlerModalVisibility}
            />
          </div>
        </Modal>
        <Jumbotron />
        <FeaturedEvents
          actions={actions}
          featuredEvents={featuredEvents}
          events={eventsByMonth}
          handlerModalVisibility={this.handlerModalVisibility}
        />
        <SchedulerContainer
          actions={actions}
          breakpoint={breakpoint}
          events={eventsByMonth}
          handlerModalVisibility={this.handlerModalVisibility}
        />
      </div>
    );
  }
}

const mapPropsToState = _state => {
  return {
    eventsByMonth: _state.events.eventsByMonth,
    featuredEvents: _state.events.featuredEvents,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(eventActions, _dispatch),
  };
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

Events.propTypes = {
  actions: PropTypes.shape({
    getEventsByMonth: PropTypes.func,
    getAllEventsByMonth: PropTypes.func,
  }),
  breakpoint: PropTypes.string,
  classes: PropTypes.shape({
    paper: PropTypes.string,
  }),
  eventsByMonth: PropTypes.arrayOf(PropTypes.shape({})),
  featuredEvents: PropTypes.arrayOf(PropTypes.shape({})),
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withStyles(styles)(Events));
