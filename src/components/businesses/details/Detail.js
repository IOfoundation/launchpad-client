import React from 'react';

const Detail = props => {
  return (
    <div className="business-detail">
      <h4 className="business-detail__title text-semi">{props.title}</h4>
      <p className="business-detail__content text-thin">{props.content}</p>
    </div>
  );
};

export default Detail;
