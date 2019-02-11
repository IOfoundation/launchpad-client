import React from 'react';
import {PropTypes} from 'prop-types';

const FeaturedPost = props => {
  const {imageSrc, title, description} = props;

  return (
    <div className="featured-post">
      <div className="featured-post__img-container">
        <img className="featured-post__img-container__img" src={imageSrc} />
      </div>
      <h3 className="featured-post__title text-bold">{title}</h3>
      <p className="featured-post__description">{description}</p>
    </div>
  );
};

FeaturedPost.propTypes = {
  description: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default FeaturedPost;
