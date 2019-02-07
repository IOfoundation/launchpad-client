import React from 'react';
import {PropTypes} from 'prop-types';

const Service = props => {
  let $email = null;

  if (props.extra) {
    $email = (
      <p className="service__extra">
        <span className="text-semi">{props.extra.label}</span>{' '}
        <span className="service__extra__content">{props.extra.content}</span>
      </p>
    );
  }
  return (
    <div className="service">
      <h3 className="service__title text-bold">{props.title}</h3>
      {$email}
      <p className="service__content">{props.content}</p>
    </div>
  );
};

Service.propTypes = {
  content: PropTypes.string.isRequired,
  extra: PropTypes.shape({
    label: PropTypes.string,
    content: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
};

export default Service;
