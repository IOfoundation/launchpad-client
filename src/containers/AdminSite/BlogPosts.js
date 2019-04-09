import React from 'react';

import Layout from './Layout';
import BlogPostsFormContainer from '../../components/admin-site/elements/BlogPostsFormContainer';
import withErrorHandler from '@HOC/withErrorHandler';

import {httpRequest} from '@Utils';

const BlogPosts = () => {
  return (
    <Layout>
      <BlogPostsFormContainer />
    </Layout>
  );
};

export default withErrorHandler(BlogPosts, httpRequest);
