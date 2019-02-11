import React from 'react';

const Jumbotron = () => {
  return (
    <div className="events-jumbotron">
      <div className="events-jumbotron__container">
        <h2 className="events-jumbotron__title">{"What's Happening"}</h2>
        <p className="events-jumbotron__description">
          {
            'There are many events throughout the Sacramento Region for all phases of businesses. See our most popular keynote events on the event list below or explore the calendar.'
          }
        </p>
      </div>
    </div>
  );
};

export default Jumbotron;
