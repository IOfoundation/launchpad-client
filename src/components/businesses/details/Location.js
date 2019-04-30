import React from 'react';
import {PropTypes} from 'prop-types';

const Location = props => {
  const {onDetailsClicked, extraClasses} = props;

  const detailLocationClass = ['detail-location'];

  if (extraClasses) {
    extraClasses.forEach(extraClass => {
      detailLocationClass.push(extraClass);
    });
  }

  return (
    <div className={detailLocationClass.join(' ')}>
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
  email: PropTypes.string,
  extraClasses: PropTypes.arrayOf(PropTypes.string),
  onDetailsClicked: PropTypes.func,
  phone: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Location;
