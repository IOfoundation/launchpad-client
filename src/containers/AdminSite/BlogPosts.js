import React from 'react';
import {PropTypes} from 'prop-types';

import Layout from './Layout';
import BlogPostsFormContainer from '../../components/admin-site/elements/BlogPostsFormContainer';

const BlogPosts = props => {
  return (
    <Layout router={props.router}>
      <BlogPostsFormContainer />
    </Layout>
  );
};

BlogPosts.propTypes = {
  router: PropTypes.shape({}),
};

export default BlogPosts;
