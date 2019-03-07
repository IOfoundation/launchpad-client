import React from 'react';
import {PropTypes} from 'prop-types';
import Layout from '../Layout';
import PostDetails from '../../components/blog/details/PostDetails';

const PostDetailsRoute = props => {
  return (
    <Layout>
      <PostDetails breakpoint={props.breakpoint} />
    </Layout>
  );
};

PostDetailsRoute.propTypes = {
  breakpoint: PropTypes.string,
};

export default PostDetailsRoute;
