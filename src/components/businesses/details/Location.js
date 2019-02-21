import React from 'react';
import {PropTypes} from 'prop-types';

const Location = props => {
  const {onDetailsClicked} = props;

  return (
    <div className="detail-location">
      <h3
        className="detail-location__title text-semi"
        onClick={onDetailsClicked}
      >
        {props.title}
      </h3>
      <p className="detail-location__content">{props.address}</p>
      <p className="detail-location__content">{props.phone}</p>
      <a
        className="detail-location__content detail-location__content--hover"
        href={`mailto:${props.email}`}
      >
        {props.email}
      </a>
    </div>
  );
};

Location.propTypes = {
  address: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onDetailsClicked: PropTypes.func,
  phone: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Location;
