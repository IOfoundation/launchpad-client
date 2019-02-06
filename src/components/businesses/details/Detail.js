import React from 'react';
import {PropTypes} from 'prop-types';

const Detail = props => {
  return (
    <div className="business-detail">
      <h4 className="business-detail__title text-semi">{props.title}</h4>
      <p className="business-detail__content text-thin">{props.content}</p>
    </div>
  );
};

Detail.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Detail;
