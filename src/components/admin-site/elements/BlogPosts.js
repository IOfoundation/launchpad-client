import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LandingComponent from '../Landing';
import Title from '../Title';
import Items from './BlogPosts/Items';
import Pagination from '../../businesses/Pagination';
import CustomTabs from '@Shared/Tabs';
import Loading from '@Shared/Loading';

import * as getAdminPost from '@Actions/admin-blogs';
import {htmlStripper, truncate, getDate} from '@Utils';

class BlogPosts extends PureComponent {
  componentDidMount() {
    this.props.actions.getAdminPost(1);
  }

  menuChanged = index => {
    this.props.actions.getAdminPost(1, this._tabOptions[index]);
  };

  _tabOptions = ['Drafts', 'Posted'];

  render() {
    const handleChangePage = () => {};
    const {drafts, posted} = this.props;
    let draftsElements = <Loading />;
    let postedElements = <Loading />;

    if (drafts.data.length > 0) {
      draftsElements = <Items items={drafts.data} />;
    }

    if (posted.data.length > 0) {
      postedElements = <Items items={posted.data} />;
    }

    return (
      <LandingComponent navigation={true}>
        <Title
          titleText="Your Blog Posts"
          hideCancelAction={true}
          submitLabel="Create Blog Post"
        />
        <CustomTabs tabs={this._tabOptions} changed={this.menuChanged}>
          {draftsElements}
          {postedElements}
        </CustomTabs>
        <Pagination
          appliedFilters={{category: 'admin-posts', page: 1}}
          handleChangePage={handleChangePage}
          metadata={{
            pagination: {
              last: {
                page: 10,
              },
              currentPage: 1,
            },
            totalOrganization: '10',
          }}
          noMargin={true}
        />
      </LandingComponent>
    );
  }
}

function postToBlogPosts(posts, draft = false) {
  return posts.map(post => {
    const category =
      (post.categories && post.categories[0].name) || 'No Category';
    const date = getDate(post.posted_at);
    let description = htmlStripper(post.body);
    let title = post.title;

    if (description.split('').length > 120) {
      description = truncate(description, 120);
    }

    if (title.split('').length > 70) {
      title = truncate(title, 70);
    }

    return {
      id: post.id,
      title,
      description,
      label: draft ? 'Last Edited:' : 'Posted:',
      date: `${date.monthLarge} ${date.dayNumber}, ${date.year}`,
      category,
    };
  });
}

const mapStateToProps = _state => {
  const drafts = _state.adminBlogs.drafts;
  const posted = _state.adminBlogs.posted;

  return {
    drafts: {
      data: postToBlogPosts(drafts.data, true),
      noResults: drafts.data.length > 0,
      page: drafts.page,
      totalPages: drafts.totalPages,
    },
    posted: {
      data: postToBlogPosts(posted.data),
      noResults: posted.data.length > 0,
      page: posted.page,
      totalPages: posted.totalPages,
    },
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(getAdminPost, _dispatch),
  };
};

BlogPosts.propTypes = {
  actions: PropTypes.shape({
    getAdminPost: PropTypes.func,
  }),
  drafts: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    noResults: PropTypes.bool,
    page: PropTypes.number,
    totalPages: PropTypes.number,
  }),
  posted: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    noResults: PropTypes.bool,
    page: PropTypes.number,
    totalPages: PropTypes.number,
  }),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogPosts);
