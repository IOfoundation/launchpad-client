import React from 'react';
import {PropTypes} from 'prop-types';

import Jumbotron from './Jumbotron';
import FeaturedEvents from './FeaturedEvents/FeaturedEvents';
import SchedulerContainer from './SchedulerContainer';

const Events = props => {
  const {breakpoint} = props;

  return (
    <div className="events-container">
      <Jumbotron />
      <FeaturedEvents />
      <SchedulerContainer breakpoint={breakpoint} />
    </div>
  );
};

Events.propTypes = {
  breakpoint: PropTypes.string,
};

export default Events;
