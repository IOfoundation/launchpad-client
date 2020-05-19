import React, {Fragment} from 'react';

import PostListItemLoading from './PostListItemLoading';

const PostListLoading = () => {
  return (
    <Fragment>
      <div className="post-lists-loading__title">
        <span className="post-lists-loading__title__loading animated-background" />
      </div>
      <PostListItemLoading />
      <PostListItemLoading />
      <PostListItemLoading />
    </Fragment>
  );
};

export default PostListLoading;
