import React from 'react';
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
import * as snackbarActions from '@Actions/snackbar';

const blogPostsSchema = Yup.object().shape({
  category: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  body: Yup.string().required('Required'),
});

const initialValues = {
  category: '',
  title: '',
  body: '',
};

const ProfileFormContainer = props => {
  return (
    <LandingComponent breakpoint={props.breakpoint} navigation={false}>
      <Title
        titleText="Create Post"
        hideCancelAction={false}
        submitLabel={'Publish'}
      />
      <Formik
        render={_props => (
          <BlogPostsForm {..._props} breakpoint={props.breakpoint} />
        )}
        initialValues={initialValues}
        validationSchema={blogPostsSchema}
        onSubmit={() => {}}
      />
    </LandingComponent>
  );
};

const mapStateToProps = _state => {
  return {
    error: _state.user.error,
    isAuth: _state.user.authorization !== '',
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    userActions: bindActionCreators(user, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
  };
};

ProfileFormContainer.propTypes = {
  breakpoint: PropTypes.string,
  error: PropTypes.bool,
  isAuth: PropTypes.bool,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
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
