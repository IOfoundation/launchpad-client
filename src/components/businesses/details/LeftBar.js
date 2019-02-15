import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';

import Locations from './Locations';
import UpcomingEvents from './UpcomingEvents';
import {getDateFromString} from '../../../utils/getDateFromString';

const LeftBar = props => {
  const {organization, events} = props;
  let $events = <p>{'There is no upcoming Events'}</p>;
  let $button = null;

  if (events.length > 0) {
    $events = events.slice(0, 3).map((event, index) => {
      const date = getDateFromString(event.posted_at);

      return (
        <UpcomingEvents
          key={event.id}
          text={event.title}
          day={date.day}
          month={date.month}
        />
      );
    });
  }

  if (events.length > 3) {
    $button = (
      <Link to="/events" className="view-more">
        {'View More'}
      </Link>
    );
  }

  return (
    <div className="left-bar">
      <Locations locations={organization.locations} />
      <h3 className="left-bar__title text-bold">{'Upcoming events'}</h3>
      {$events}
      {$button}
    </div>
  );
};

LeftBar.propTypes = {
  organization: PropTypes.shape({
    services: PropTypes.arrayOf(PropTypes.object),
    locations: PropTypes.arrayOf(PropTypes.object),
  }),
  events: PropTypes.arrayOf(PropTypes.shape({})),
};

export default LeftBar;
