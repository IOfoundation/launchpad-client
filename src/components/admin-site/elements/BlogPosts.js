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
import Modal from './BlogPosts/Modal';

import * as snackbarActions from '@Actions/snackbar';
import * as adminPostActions from '@Actions/admin-blogs';
import {htmlStripper, truncate, getDate, getAuthorization} from '@Utils';

class BlogPosts extends PureComponent {
  state = {
    openModal: false,
  };

  componentDidMount() {
    this.getAdminPosts(1);
  }

  componentDidUpdate(prevProps) {
    const {snackbar, deleteSuccess} = this.props;

    if (deleteSuccess !== prevProps.deleteSuccess) {
      if (deleteSuccess) {
        snackbar.showSnackbar({
          message: 'Post deleted successfully',
        });
        this.handlerModalVisibility();
        this.getAdminPosts(1, this._tabSelected);
      }
    }
  }

  menuChanged = index => {
    this._tabSelected = this._tabOptions[index];
    this.getAdminPosts(1, this._tabSelected);
  };

  handleChangePage = page => {
    this.getAdminPosts(page, this._tabSelected);
  };

  getAdminPosts = (page, option) => {
    this.props.actions.getAdminPost(page, option, this.props.organizationId);
  };

  deletePost = deleteOptions => {
    this.props.actions.deletePost(deleteOptions);
  };

  _getPagination = (page, totalPages) => {
    return (
      <Pagination
        appliedFilters={{category: 'admin-posts', page}}
        handleChangePage={this.handleChangePage}
        metadata={{
          pagination: {
            last: {
              page: totalPages,
            },
            currentPage: page,
          },
          totalOrganization: String(totalPages),
        }}
        noMargin={true}
      />
    );
  };

  goToBlogCreate = () => {
    this.props.router.push('/admin/blog/new');
  };

  optionSelected = ({option, id}) => {
    this._idSelected = id;
    if (option === 'Delete') {
      this.handlerModalVisibility();
    } else if (option === 'Edit') {
      this.props.router.push(`/admin/blog/${id}`);
    }
  };

  handlerModalVisibility = () => {
    this.setState(prevState => {
      return {
        openModal: !prevState.openModal,
      };
    });
  };

  modalClosed = () => {
    this.handlerModalVisibility();
  };

  _tabOptions = ['Drafts', 'Posted'];
  _tabSelected = 'Drafts';
  _idSelected = '';

  render() {
    const {drafts, posted, auth} = this.props;
    const {openModal} = this.state;
    let draftsElements = <Loading />;
    let postedElements = <Loading />;
    let pagination = null;

    if (drafts.noResults && !drafts.loading) {
      draftsElements = (
        <p className="text-regular paragraph">{'No posts available.'}</p>
      );
    } else if (!drafts.loading) {
      draftsElements = (
        <Items items={drafts.data} optionSelected={this.optionSelected} />
      );
    }

    if (posted.noResults && !posted.loading) {
      postedElements = (
        <p className="text-regular paragraph">{'No posts available.'}</p>
      );
    } else if (!posted.loading) {
      postedElements = (
        <Items items={posted.data} optionSelected={this.optionSelected} />
      );
    }

    if (this._tabSelected === 'Drafts') {
      pagination = this._getPagination(drafts.page, drafts.totalPages);
    } else if (this._tabSelected === 'Posted') {
      pagination = this._getPagination(posted.page, posted.totalPages);
    }

    return (
      <LandingComponent navigation={true}>
        <Modal
          open={openModal}
          modalClosed={this.modalClosed}
          cancelClicked={this.handlerModalVisibility}
          deleteClicked={() => this.deletePost({auth, id: this._idSelected})}
        />
        <Title
          titleText="Your Blog Posts"
          hideCancelAction={true}
          submitLabel="Create Blog Post"
          submitClicked={this.goToBlogCreate}
        />
        <CustomTabs tabs={this._tabOptions} changed={this.menuChanged}>
          {draftsElements}
          {postedElements}
        </CustomTabs>
        {pagination}
      </LandingComponent>
    );
  }
}

function postToBlogPosts(posts, draft = false) {
  return posts.map(post => {
    const categoryObject = post.categories.find(
      cat => cat.name !== 'featured' && cat.name !== 'front page'
    );
    const category = (categoryObject || {}).name || 'No Category';
    const date = getDate(post.posted_at);
    let description = htmlStripper(post.body);
    let title = post.title;

    if (description.split('').length > 190) {
      description = truncate(description, 190);
    }

    if (title.split('').length > 130) {
      title = truncate(title, 130);
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
  const organizationId =
    _state.user.organizationId || sessionStorage.getItem('organizationId');
  const auth = getAuthorization(_state);

  return {
    drafts: {
      data: postToBlogPosts(drafts.data, true),
      noResults: drafts.data.length === 0,
      page: drafts.page,
      totalPages: drafts.totalPages,
      loading: drafts.loading,
    },
    posted: {
      data: postToBlogPosts(posted.data),
      noResults: posted.data.length === 0,
      page: posted.page,
      totalPages: posted.totalPages,
      loading: posted.loading,
    },
    noResults: _state.adminBlogs.noResults,
    organizationId,
    auth,
    deleteSuccess: _state.adminBlogs.deletePost.success,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(adminPostActions, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
  };
};

BlogPosts.propTypes = {
  actions: PropTypes.shape({
    getAdminPost: PropTypes.func,
    deletePost: PropTypes.func,
  }),
  auth: PropTypes.string,
  deleteSuccess: PropTypes.bool,
  drafts: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    page: PropTypes.number,
    totalPages: PropTypes.number,
    loading: PropTypes.bool,
  }),
  noResults: PropTypes.bool,
  organizationId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  posted: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    page: PropTypes.number,
    totalPages: PropTypes.number,
    loading: PropTypes.bool,
  }),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogPosts);
