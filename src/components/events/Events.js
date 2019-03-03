import React from 'react';
import Jumbotron from './Jumbotron';
import FeaturedEvents from './FeaturedEvents/FeaturedEvents';
import SchedulerContainer from './SchedulerContainer';

const Events = () => {
  return (
    <div className="events-container">
      <Jumbotron />
      <FeaturedEvents />
      <SchedulerContainer />
    </div>
  );
};

export default Events;
