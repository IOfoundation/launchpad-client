import React from 'react';

import Layout from './Layout';
import BlogPostsFormContainer from '../../components/admin-site/elements/BlogPostsFormContainer';
import withErrorHandler from '@HOC/withErrorHandler';

const BlogPosts = () => {
  return (
    <Layout>
      <BlogPostsFormContainer />
    </Layout>
  );
};

export default withErrorHandler(BlogPosts);
