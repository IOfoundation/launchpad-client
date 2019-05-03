import React from 'react';
import {PropTypes} from 'prop-types';

const Location = props => {
  const {
    onDetailsClicked,
    extraClasses,
    title,
    address,
    addressSecondLine,
  } = props;

  const detailLocationClass = ['detail-location'];
  const mappedAddress = address || 'Virtual location';
  const mappedSecondLine = addressSecondLine ? (
    <p className="detail-location__content">{addressSecondLine}</p>
  ) : null;

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
        {title}
      </h3>
      <p className="detail-location__content">{mappedAddress}</p>
      {mappedSecondLine}
      {props.phone && <p className="detail-location__content">{props.phone}</p>}
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
  addressSecondLine: PropTypes.string,
  email: PropTypes.string,
  extraClasses: PropTypes.arrayOf(PropTypes.string),
  onDetailsClicked: PropTypes.func,
  phone: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Location;
