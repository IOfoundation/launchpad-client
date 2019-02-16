import React from 'react';
import {PropTypes} from 'prop-types';

const UpcomingEvents = props => {
  const {text, month, day, clicked} = props;

  return (
    <div className="upcoming-events" onClick={clicked}>
      <div className="upcoming-events__date">
        <div className="upcoming-events__date__month">{month}</div>
        <div className="upcoming-events__date__day text-semi">{day}</div>
      </div>
      <div className="upcoming-events__text text-semi">{text}</div>
    </div>
  );
};

UpcomingEvents.propTypes = {
  clicked: PropTypes.func,
  day: PropTypes.string,
  month: PropTypes.string,
  text: PropTypes.string,
};

export default UpcomingEvents;
