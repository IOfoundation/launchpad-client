import React from 'react';
import {PropTypes} from 'prop-types';

const Jumbotron = props => {
  const {descriptionModifacor, title, description, background} = props;
  const descriptionClasses = ['jumbotron__description', 'text-thin'];

  if (props.descriptionModifacor) {
    descriptionClasses.push(`jumbotron__description--${descriptionModifacor}`);
  }

  return (
    <div
      className="jumbotron"
      style={{
        backgroundImage: `url(/static-data/images/${background}.png)`,
      }}
    >
      <div className="jumbotron__container">
        <h2 className="jumbotron__title">{title}</h2>
        <p className={descriptionClasses.join(' ')}>{description}</p>
      </div>
    </div>
  );
};

Jumbotron.propTypes = {
  background: PropTypes.string,
  description: PropTypes.string,
  descriptionModifacor: PropTypes.string,
  title: PropTypes.string,
};

export default Jumbotron;
