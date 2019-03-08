import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';
import Layout from '../Layout';
import PostDetails from '../../components/blog/details/PostDetails';
import * as actions from '../../actions/blogs';

class PostDetailsRoute extends PureComponent {
  componentDidMount() {
    this.props.actions.getPostById(this.props.params.id);
  }

  render() {
    const {breakpoint, post} = this.props;

    return (
      <Layout>
        <PostDetails breakpoint={breakpoint} post={post.result} />
      </Layout>
    );
  }
}

const mapStateToProps = _state => {
  const {blogs: _blogs} = _state;

  return {
    post: {
      result: _blogs.post,
      noResults: _blogs.noResults,
    },
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

PostDetailsRoute.propTypes = {
  actions: PropTypes.shape({
    getPostById: PropTypes.func,
  }),
  breakpoint: PropTypes.string,
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
  post: PropTypes.shape({
    result: PropTypes.shape({
      result: PropTypes.shape({}),
      noResults: PropTypes.bool,
    }),
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailsRoute);
