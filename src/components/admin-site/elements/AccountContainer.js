import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

import Account from './Account';
import LandingComponent from '../Landing';
import Title from '../Title';

import * as user from '@Actions/user';
import * as snackbarActions from '@Actions/snackbar';

const AccountSchema = Yup.object().shape({
  fullName: Yup.string().required('Required'),
  emailAddress: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  currentPassword: Yup.string().required('Required'),
  newPassword: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], "Password don't match")
    .required('Required'),
});

const initialValues = {
  fullName: '',
  emailAddress: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const AccountContainer = props => {
  const goToProfile = () => {
    props.router.push('/admin/profile');
  };

  return (
    <LandingComponent navigation={false}>
      <Title
        titleText="Edit Your Account"
        hideCancelAction={false}
        submitLabel={'Update'}
        cancelClicked={goToProfile}
      />
      <Formik
        render={_props => <Account {..._props} />}
        initialValues={initialValues}
        validationSchema={AccountSchema}
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

AccountContainer.propTypes = {
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
)(withRouter(AccountContainer));
