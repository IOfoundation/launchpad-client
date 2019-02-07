import React from 'react';
import {Link} from 'react-router';
import {PropTypes} from 'prop-types';

const Location = props => {
  return (
    <div className="detail-location">
      <Link className="detail-location__title text-semi">{props.title}</Link>
      <p className="detail-location__content">{props.address}</p>
      <p className="detail-location__content">{props.phone}</p>
      <a className="detail-location__content" href={`mailto:${props.email}`}>
        {props.email}
      </a>
    </div>
  );
};

Location.propTypes = {
  address: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Location;
