import React from 'react';
import {PropTypes} from 'prop-types';

export const DetailFeaturedPost = props => {
  const {description, date, clicked} = props;

  return (
    <div className="detail-featured-post" onClick={clicked}>
      <p className="detail-featured-post__description text-bold">
        {description}
      </p>
      <p className="detail-featured-post__date text-thin">{date}</p>
    </div>
  );
};

DetailFeaturedPost.propTypes = {
  clicked: PropTypes.func,
  date: PropTypes.string,
  description: PropTypes.string,
};

export default DetailFeaturedPost;
