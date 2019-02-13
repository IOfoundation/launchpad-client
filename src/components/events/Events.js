import React from 'react';
import Jumbotron from './Jumbotron';
import FeaturedEvents from './FeaturedEvents/FeaturedEvents';

const Events = () => {
  return (
    <div className="events-container">
      <Jumbotron />
      <FeaturedEvents />
    </div>
  );
};

export default Events;
