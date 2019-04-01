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
  category: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  body: Yup.string(),
});

const initialValues = {
  category: '',
  title: '',
  body: '',
};

class ProfileFormContainer extends PureComponent {
  componentDidMount() {
    this.props.blogsActions.getCategories();
  }

  componentDidUpdate(prevProps) {
    const {snackbar, savePostError} = this.props;

    if (savePostError !== prevProps.savePostError) {
      if (savePostError) {
        snackbar.showSnackbar({
          message: 'An error has ocurred while Save Post',
        });
      }
    }
  }

  _submitForm;

  goToBlogs = () => {
    this.props.router.push('/admin/blog');
  };

  saveDraftAction = () => {
    this.props.snackbar.showSnackbar({
      message: 'An error has ocurred',
    });
  };

  openSnackbar = message => {
    this.props.snackbar.showSnackbar({
      message,
    });
  };

  submitFormToSaveData = () => {
    this._submitForm();
  };

  savePostAction = values => {
    this.props.adminBlogsActions.savePost(values);
  };

  render() {
    const {breakpoint, categories, router} = this.props;

    return (
      <LandingComponent breakpoint={breakpoint} navigation={false}>
        <Title
          titleText="Create Post"
          hideCancelAction={false}
          submitLabel={'Publish'}
          submitClicked={this.submitFormToSaveData}
          cancelClicked={this.goToBlogs}
          extraLabel="Save Draft"
          extraClicked={this.saveDraftAction}
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
  return {
    error: _state.user.error,
    isAuth: _state.user.authorization !== '',
    categories: _state.blogs.categories,
    savePostError: Object.keys(_state.adminBlogs.savePost.errors).length > 0,
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
  }),
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
  isAuth: PropTypes.bool,
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
