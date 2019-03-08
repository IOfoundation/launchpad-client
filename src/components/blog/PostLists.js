import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';
import {truncate, maxCharacters} from '../../utils';

import PostListItem from './PostListItem';
import * as actions from '../../actions/blogs';
import Pagination from '../businesses/Pagination';

class PostLists extends PureComponent {
  componentDidMount() {
    this.props.actions.getAllPosts(1, this.props.posts.category);
  }

  handleChangePage = selected => {
    this.props.actions.getAllPosts(selected, this.props.posts.category);
  };

  render() {
    const {posts} = this.props;
    let resultsElements = null;
    let titleElement = null;
    let paginationElement = null;

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
      titleElement = (
        <h2 className="blog-posts__title capitalize">{posts.category}</h2>
      );
      paginationElement = (
        <Pagination
          appliedFilters={{category: 'post-lists', page: this.props.posts.page}}
          handleChangePage={this.handleChangePage}
          metadata={{
            pagination: {
              last: {
                page: Number(posts.totalPages),
              },
              currentPage: this.props.posts.page,
            },
            totalOrganization: '10',
          }}
          noMargin={true}
        />
      );
    }

    return (
      <div className="blog-posts">
        {titleElement}
        {resultsElements}
        {paginationElement}
      </div>
    );
  }
}

const mapStateToProps = _state => {
  const {blogs: _blogs} = _state;

  return {
    posts: {
      results: _blogs.posts,
      noResults: _blogs.noResults,
      totalPages: _blogs.totalPages,
      page: _blogs.page,
      category: _blogs.category,
    },
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
    category: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.shape({})),
    noResults: PropTypes.bool,
    totalPages: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    page: PropTypes.page,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostLists);
