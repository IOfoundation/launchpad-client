import React from 'react';
import {PropTypes} from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as eventActions from '../../actions/events';

import Jumbotron from './Jumbotron';
import FeaturedEvents from './FeaturedEvents/FeaturedEvents';
import SchedulerContainer from './SchedulerContainer';

const Events = props => {
  const {breakpoint, actions, featuredEvents, eventsByMonth} = props;

  return (
    <div className="events-container">
      <Jumbotron />
      <FeaturedEvents actions={actions} featuredEvents={featuredEvents} />
      <SchedulerContainer
        actions={actions}
        breakpoint={breakpoint}
        events={eventsByMonth}
      />
    </div>
  );
};

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

Events.propTypes = {
  actions: PropTypes.shape({
    getEventsByMonth: PropTypes.func,
    getAllEventsByMonth: PropTypes.func,
  }),
  breakpoint: PropTypes.string,
  eventsByMonth: PropTypes.arrayOf(PropTypes.shape({})),
  featuredEvents: PropTypes.arrayOf(PropTypes.shape({})),
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(Events);
