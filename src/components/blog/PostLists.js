import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';
import {truncate, maxCharacters} from '../../utils';

import PostListItem from './PostListItem';
import * as actions from '../../actions/blogs';
import Loading from '../shared/Loading';

class PostLists extends PureComponent {
  state = {
    page: 1,
  };

  componentDidMount() {
    this.props.actions.getAllPosts(this.state.page);
  }

  render() {
    const {section, posts} = this.props;
    let resultsElements = (
      <Loading elementConfig={{style: {margin: '0 auto', padding: 0}}} />
    );

    if (posts.results.length > 0) {
      resultsElements = posts.results.map(post => {
        const date = post.posted_at;
        let description = post.body;
        let title = post.title;

        if (description.split('').length > maxCharacters) {
          description = truncate(description);
        }

        if (title.split('').length > 120) {
          title = truncate(title, 110);
        }

        return (
          <PostListItem
            key={post.id}
            title={title}
            description={description}
            tag={post.organization.name}
            date={`${date.monthLarge} ${date.day}, ${date.year}`}
          />
        );
      });
    }

    return (
      <div className="blog-posts">
        <h2 className="blog-posts__title">{section}</h2>
        {resultsElements}
      </div>
    );
  }
}

const mapStateToProps = _state => {
  const {blogs: _blogs} = _state;

  return {
    posts: {results: _blogs.posts, noResults: _blogs.noResults},
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

PostLists.propTypes = {
  actions: PropTypes.shape({
    getAllPosts: PropTypes.func,
  }),
  posts: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({})),
    noResults: PropTypes.bool,
  }),
  section: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostLists);
