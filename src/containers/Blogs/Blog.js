import React from 'react';
import {PropTypes} from 'prop-types';
import Layout from '../Layout';
import Blog from '../../components/blog/Blog';

const BlogRoute = props => {
  return (
    <Layout>
      <Blog breakpoint={props.breakpoint} />
    </Layout>
  );
};

BlogRoute.propTypes = {
  breakpoint: PropTypes.string,
};

export default BlogRoute;
