import React from 'react';
import {PropTypes} from 'prop-types';

const PostListItem = props => {
  const {title, description, tag, date} = props;

  return (
    <div className="post-lists-item">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="post-lists-item__tags">
        <span className="post-lists-item__tags__name">{tag}</span>
        {' | '}
        <span className="post-lists-item__tags__date">{date}</span>
      </div>
    </div>
  );
};

PostListItem.propTypes = {
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PostListItem;
