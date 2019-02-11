import React from 'react';
import {PropTypes} from 'prop-types';
import PostListItem from './PostListItem';

const PostLists = props => {
  const {section} = props;

  return (
    <div className="blog-posts">
      <h2>{section}</h2>
      <PostListItem
        title="Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua Eni Sunt Proident Blandit Aute In Dolor"
        description="Curabitur blandit tempus porttitor. Maecenas faucibus mollis interdum. Lorem ipsum dolor. Tempus curabitur blandit tempus porttitor. Maecenas faucibus mollis interdum. Lorem maecenas faucibus."
        tag="Governor’s Office of Business and Economic Development"
        date="February 2, 2018"
      />
      <PostListItem
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur."
        description="Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus et magnis dis parturient montes..."
        tag="Grow America Fund"
        date="February 2, 2018"
      />
      <PostListItem
        title="Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua Eni Sunt Proident Blandit Aute In Dolor"
        description="Curabitur blandit tempus porttitor. Maecenas faucibus mollis interdum. Lorem ipsum dolor. Tempus curabitur blandit tempus porttitor. Maecenas faucibus mollis interdum. Lorem maecenas faucibus."
        tag="Governor’s Office of Business and Economic Development"
        date="February 2, 2018"
      />
      <PostListItem
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur."
        description="Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus et magnis dis parturient montes."
        tag="Grow America Fund"
        date="February 2, 2018"
      />
      <PostListItem
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur."
        description="Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus et magnis dis parturient montes."
        tag="Grow America Fund"
        date="February 2, 2018"
      />
    </div>
  );
};

PostLists.propTypes = {
  section: PropTypes.string,
};

export default PostLists;
