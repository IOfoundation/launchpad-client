import React from 'react';
import Layout from './Layout';
import BlogPosts from '../../components/admin-site/elements/BlogPosts';

const BlogPostsIndex = props => {
  return (
    <Layout>
      <BlogPosts router={props.router} />
    </Layout>
  );
};

export default BlogPostsIndex;
