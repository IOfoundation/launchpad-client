import React from 'react';
import PropTypes from 'prop-types';

const FeaturedEvent = props => {
  return (
    <div className="featured-event">
      <h3 className="featured-event__title text-bold">{props.title}</h3>
      <p className="featured-event__description">{props.description}</p>
      <p className="featured-event__information">
        <span className="featured-event__information__date text-bold">
          {props.date}
        </span>{' '}
        {'by'} <span>{props.name}</span>
      </p>
    </div>
  );
};

FeaturedEvent.propTypes = {
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default FeaturedEvent;
