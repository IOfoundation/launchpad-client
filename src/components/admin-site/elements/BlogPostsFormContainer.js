import React, {PureComponent} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

import BlogPostsForm from './BlogPostsForm';
import LandingComponent from '../Landing';
import Title from '../Title';
import Loading from '@Shared/Loading';

import * as user from '@Actions/user';
import * as blogs from '@Actions/blogs';
import * as adminBlogs from '@Actions/admin-blogs';
import * as snackbarActions from '@Actions/snackbar';
import {getAuthorization} from '@Utils';

const blogPostsSchema = Yup.object().shape({
  category: Yup.string().required('Category is Required'),
  title: Yup.string().required('Title is Required'),
  body: Yup.string().required('Content is Required'),
});

class ProfileFormContainer extends PureComponent {
  state = {
    renderForm: false,
  };

  componentDidMount() {
    this.props.blogsActions.getCategories();
    this.props.adminBlogsActions.hideFooter(true);

    if (this.props.router.params.id !== 'new') {
      this.props.blogsActions.getPostById(this.props.router.params.id);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      snackbar,
      savePostError,
      postSaved,
      router,
      postUpdated,
    } = this.props;

    if (savePostError !== prevProps.savePostError) {
      if (savePostError) {
        snackbar.showSnackbar({
          message: 'An error has occurred while Publishing your post',
        });
      }
    }

    if (postSaved !== prevProps.postSaved) {
      if (postSaved) {
        snackbar.showSnackbar({
          message: this._isPublished
            ? 'Your post has been published'
            : 'Draft created successfully',
        });
        router.push('/admin/blog');
      }
    }

    if (postUpdated !== prevProps.postUpdated) {
      if (postUpdated) {
        snackbar.showSnackbar({
          message: this._isPublished
            ? 'Your post has been published'
            : 'Draft updated successfully',
        });
        router.push('/admin/blog');
      }
    }
  }

  componentWillUnmount() {
    this.props.adminBlogsActions.hideFooter(false);
    this.props.blogsActions.resetPostByID();
  }

  _submitForm;
  _isPublished;
  _initialValues = {
    category: '',
    title: '',
    body: '',
  };

  goToBlogs = () => {
    this.props.router.push('/admin/blog');
  };

  openSnackbar = message => {
    this.props.snackbar.showSnackbar({
      message,
    });
  };

  submitFormToSaveData = isPublished => {
    this._isPublished = isPublished;
    this._submitForm();
  };

  savePostAction = values => {
    this.props.adminBlogsActions.savePost({
      ...values,
      auth: this.props.auth,
      published: this._isPublished,
    });
  };

  updatePostAction = values => {
    this.props.adminBlogsActions.updatePost({
      ...values,
      id: values.id,
      auth: this.props.auth,
      published: this._isPublished,
    });
  };

  _getForm = (initialValues, mode, id) => {
    const {categories, breakpoint, router} = this.props;

    return (
      <Formik
        enableReinitialize={true}
        render={_props => {
          this._submitForm = _props.submitForm;
          return (
            <BlogPostsForm
              {..._props}
              breakpoint={breakpoint}
              categories={categories}
              router={router}
              initialValues={initialValues}
            />
          );
        }}
        initialValues={initialValues}
        validationSchema={blogPostsSchema}
        onSubmit={values => {
          if (mode === 'new') {
            this.savePostAction(values);
          } else if (mode === 'edit') {
            this.updatePostAction({...values, id});
          }
        }}
      />
    );
  };

  render() {
    const {breakpoint, router, hideFooter, post, getPostIdSuccess} = this.props;
    let form = <Loading />;

    if (router.params.id === 'new') {
      form = this._getForm(this._initialValues, 'new');
    } else if (getPostIdSuccess) {
      form = this._getForm(
        {
          category: post.result.categories[0].name,
          title: post.result.title,
          body: post.result.body,
        },
        'edit',
        post.result.id
      );
    }

    return (
      <LandingComponent
        breakpoint={breakpoint}
        navigation={false}
        hideFooter={hideFooter}
      >
        <Title
          cancelClicked={this.goToBlogs}
          extraClicked={() => this.submitFormToSaveData(false)}
          extraLabel="Save Draft"
          hideCancelAction={false}
          noMargin={breakpoint !== 'xs' && breakpoint !== 'sm'}
          submitClicked={() => this.submitFormToSaveData(true)}
          submitLabel={'Publish'}
          titleText="Create Post"
        />
        {form}
      </LandingComponent>
    );
  }
}

const mapStateToProps = _state => {
  const auth = getAuthorization(_state);

  return {
    error: _state.user.error,
    auth,
    categories: _state.blogs.categories.filter(
      cat => cat.name !== 'front page'
    ),
    savePostError: Object.keys(_state.adminBlogs.savePost.errors).length > 0,
    hideFooter: _state.adminBlogs.hideFooter,
    postSaved: Object.keys(_state.adminBlogs.savePost.data).length > 0,
    postUpdated: Object.keys(_state.adminBlogs.updatePost.data).length > 0,
    post: {
      result: _state.blogs.getPostIdSuccess
        ? {
            ..._state.blogs.post,
            categories: _state.blogs.post.categories.filter(
              cat => cat.name !== 'front page' && cat.name !== 'featured'
            ),
          }
        : _state.blogs.post,
      noResults: _state.blogs.noResults,
    },
    getPostIdSuccess: _state.blogs.getPostIdSuccess,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    userActions: bindActionCreators(user, _dispatch),
    blogsActions: bindActionCreators(blogs, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
    adminBlogsActions: bindActionCreators(adminBlogs, _dispatch),
  };
};

ProfileFormContainer.propTypes = {
  adminBlogsActions: PropTypes.shape({
    hideFooter: PropTypes.func,
    savePost: PropTypes.func,
    updatePost: PropTypes.func,
  }),
  auth: PropTypes.string,
  blogsActions: PropTypes.shape({
    getCategories: PropTypes.func,
    getPostById: PropTypes.func,
    resetPostByID: PropTypes.func,
  }),
  breakpoint: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  error: PropTypes.bool,
  getPostIdSuccess: PropTypes.bool,
  hideFooter: PropTypes.bool,
  isAuth: PropTypes.bool,
  post: PropTypes.shape({
    result: PropTypes.shape({
      result: PropTypes.shape({}),
      noResults: PropTypes.bool,
    }),
  }),
  postSaved: PropTypes.bool,
  postUpdated: PropTypes.bool,
  router: PropTypes.shape({
    push: PropTypes.func,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  savePostError: PropTypes.bool,
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
  userActions: PropTypes.shape({
    login: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileFormContainer));
