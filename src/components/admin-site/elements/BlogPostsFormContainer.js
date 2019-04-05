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

import * as user from '@Actions/user';
import * as blogs from '@Actions/blogs';
import * as adminBlogs from '@Actions/admin-blogs';
import * as snackbarActions from '@Actions/snackbar';

const blogPostsSchema = Yup.object().shape({
  category: Yup.string().required('Category is Required'),
  title: Yup.string().required('Title is Required'),
  body: Yup.string().required('Content is Required'),
});

const initialValues = {
  category: '',
  title: '',
  body: '',
};

class ProfileFormContainer extends PureComponent {
  componentDidMount() {
    this.props.blogsActions.getCategories();
    this.props.adminBlogsActions.hideFooter(true);
  }

  componentDidUpdate(prevProps) {
    const {snackbar, savePostError, postSaved, router} = this.props;

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
            ? 'Post published successfully'
            : 'Draft created successfully',
        });
        router.push('/admin/blog');
      }
    }
  }

  componentWillUnmount() {
    this.props.adminBlogsActions.hideFooter(false);
  }

  _submitForm;
  _isPublished;

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

  render() {
    const {breakpoint, categories, router, hideFooter} = this.props;

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
          noMargin={breakpoint !== 'xs'}
          submitClicked={() => this.submitFormToSaveData(true)}
          submitLabel={'Publish'}
          titleText="Create Post"
        />
        <Formik
          render={_props => {
            this._submitForm = _props.submitForm;
            return (
              <BlogPostsForm
                {..._props}
                breakpoint={breakpoint}
                categories={categories}
                router={router}
              />
            );
          }}
          initialValues={initialValues}
          validationSchema={blogPostsSchema}
          onSubmit={values => {
            this.savePostAction(values);
          }}
        />
      </LandingComponent>
    );
  }
}

const mapStateToProps = _state => {
  const auth = _state.user.authorization || localStorage.getItem('userAuth');

  return {
    error: _state.user.error,
    auth,
    categories: _state.blogs.categories,
    savePostError: Object.keys(_state.adminBlogs.savePost.errors).length > 0,
    hideFooter: _state.adminBlogs.hideFooter,
    postSaved: Object.keys(_state.adminBlogs.savePost.data).length > 0,
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
    savePost: PropTypes.func,
    hideFooter: PropTypes.func,
  }),
  auth: PropTypes.string,
  blogsActions: PropTypes.shape({
    getCategories: PropTypes.func,
  }),
  breakpoint: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  error: PropTypes.bool,
  hideFooter: PropTypes.bool,
  isAuth: PropTypes.bool,
  postSaved: PropTypes.bool,
  router: PropTypes.shape({
    push: PropTypes.func,
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
