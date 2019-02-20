import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import Locations from './Locations';
import UpcomingEvents from './UpcomingEvents';
import {getDateFromString} from '../../../utils/getDateFromString';
import Layout from './Modal/Content';

const styles = theme => ({
  modal: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    height: '450px',
    left: '50%',
    outline: 'none',
    overflow: 'auto',
    padding: theme.spacing.unit * 4,
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '580px',
  },
});

class LeftBar extends PureComponent {
  state = {
    selectedEvent: this.props.events[0],
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
    let $events = <p>{'There are no upcoming Events'}</p>;
    let $button = null;
    let $modal = null;

    if (events && events.length > 0) {
      if (viewMoreEvents) {
        $events = events.slice(0, 3).map(event => {
          const date = getDateFromString(event.posted_at);

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
        $events = events.map(event => {
          const date = getDateFromString(event.posted_at);

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
      $button = (
        <div onClick={this.viewMoreEventsHandler} className="view-more">
          {viewMoreEvents ? 'View More' : 'View Less'}
        </div>
      );
    }

    if (selectedEvent) {
      $modal = (
        <Modal open={openModal} onClose={this.handlerModalVisibility}>
          <div className={classes.modal}>
            <Layout
              title={selectedEvent.title}
              postedBy={selectedEvent.organization}
              date={selectedEvent.starting_at}
              address={`${selectedEvent.street_1}, ${selectedEvent.street_2}, ${
                selectedEvent.state_abbr
              }, ${selectedEvent.zip}`}
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
        {$modal}
        <Locations locations={organization.locations} />
        <h3 className="left-bar__title text-bold">{'Upcoming events'}</h3>
        {$events}
        {$button}
      </div>
    );
  }
}

LeftBar.propTypes = {
  classes: PropTypes.shape({
    modal: PropTypes.string,
  }),
  events: PropTypes.arrayOf(PropTypes.shape({})),
  organization: PropTypes.shape({
    services: PropTypes.arrayOf(PropTypes.object),
    locations: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default withStyles(styles)(LeftBar);
