import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import Locations from './Locations';
import UpcomingEvents from './UpcomingEvents';
import {getDate} from '../../../utils';
import Layout from './Modal/Content';

const styles = theme => ({
  modal: {
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
  },
});

const getAddress = ({street_1, street_2, state_abbr, city, zip}) => {
  let address = '';

  if (street_2) {
    address = `${street_1}, ${street_2}, ${city}, ${state_abbr}, ${zip}`;
  } else {
    address = `${street_1}, ${city}, ${state_abbr}, ${zip}`;
  }

  return address;
};

class RightBar extends PureComponent {
  state = {
    selectedEvent: this.props.events && this.props.events[0],
    openModal: false,
    viewMoreEvents: true,
  };

  handlerModalVisibility = (event = null) => {
    this.setState(prevState => {
      return {
        openModal: !prevState.openModal,
      };
    });

    if (event) {
      this.setState({selectedEvent: event});
    }
  };

  viewMoreEventsHandler = () => {
    this.setState(prevState => {
      return {
        viewMoreEvents: !prevState.viewMoreEvents,
      };
    });
  };

  render() {
    const {organization, events, classes} = this.props;
    const {openModal, selectedEvent, viewMoreEvents} = this.state;
    let eventsElement = <p>{'There are no upcoming Events'}</p>;
    let buttonElement = null;
    let modalElement = null;

    if (events && events.length > 0) {
      if (viewMoreEvents) {
        eventsElement = events.slice(0, 3).map(event => {
          const date = getDate(event.starting_at);

          return (
            <UpcomingEvents
              key={event.id}
              text={event.title}
              day={date.day}
              month={date.month}
              clicked={() => this.handlerModalVisibility(event)}
            />
          );
        });
      } else {
        eventsElement = events.map(event => {
          const date = getDate(event.starting_at);

          return (
            <UpcomingEvents
              key={event.id}
              text={event.title}
              day={date.day}
              month={date.month}
              clicked={() => this.handlerModalVisibility(event)}
            />
          );
        });
      }
    }

    if (events && events.length > 3) {
      buttonElement = (
        <div onClick={this.viewMoreEventsHandler} className="view-more">
          {viewMoreEvents ? 'View More' : 'View Less'}
        </div>
      );
    }

    if (selectedEvent) {
      modalElement = (
        <Modal open={openModal} onClose={this.handlerModalVisibility}>
          <div className={classes.modal}>
            <Layout
              title={selectedEvent.title}
              postedBy={selectedEvent.organization}
              start={selectedEvent.starting_at}
              end={selectedEvent.ending_at}
              address={getAddress(selectedEvent)}
              link={selectedEvent.external_url}
              description={selectedEvent.body}
              closed={this.handlerModalVisibility}
            />
          </div>
        </Modal>
      );
    }

    return (
      <div className="left-bar">
        {modalElement}
        <Locations locations={organization.locations} />
        <h3 className="details-title details-title--small-space text-bold">
          {'Upcoming events'}
        </h3>
        {eventsElement}
        {buttonElement}
      </div>
    );
  }
}

RightBar.propTypes = {
  classes: PropTypes.shape({
    modal: PropTypes.string,
  }),
  events: PropTypes.arrayOf(PropTypes.shape({})),
  organization: PropTypes.shape({
    services: PropTypes.arrayOf(PropTypes.object),
    locations: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default withStyles(styles)(RightBar);
