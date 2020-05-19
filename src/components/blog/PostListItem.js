import React from 'react';
import {PropTypes} from 'prop-types';

const PostListItem = props => {
  const {title, description, tag, date, clicked} = props;

  return (
    <div className="post-lists-item" onClick={clicked}>
      <h3 className="post-lists-item__title text-bold">{title}</h3>
      <p className="post-lists-item__description">{description}</p>
      <div className="post-lists-item__tags">
        <span className="post-lists-item__tags__name text-semi">{tag}</span>
        {' | '}
        <span className="post-lists-item__tags__date">{date}</span>
      </div>
    </div>
  );
};

PostListItem.propTypes = {
  clicked: PropTypes.func,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PostListItem;
