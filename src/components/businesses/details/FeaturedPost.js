import React from 'react';
import {PropTypes} from 'prop-types';

export const FeaturedPost = props => {
  const {description, date} = props;

  return (
    <div className="featured-post">
      <p className="featured-post__description text-bold">{description}</p>
      <p className="featured-post__date text-thin">{date}</p>
    </div>
  );
};

FeaturedPost.propTypes = {
  date: PropTypes.string,
  description: PropTypes.string,
};

export default FeaturedPost;
