import React from 'react';
import {PropTypes} from 'prop-types';

import Layout from './Layout';
import BlogPosts from '../../components/admin-site/elements/BlogPosts';

const BlogPostsIndex = props => {
  return (
    <Layout>
      <BlogPosts router={props.router} />
    </Layout>
  );
};

BlogPostsIndex.propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default BlogPostsIndex;
