import React, {PureComponent} from 'react';
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
  newPassword: Yup.string()
    .min(8)
    .required('Required'),
  confirmPassword: Yup.string()
    .min(8)
    .oneOf([Yup.ref('newPassword'), null], "Password don't match")
    .required('Required'),
});

class AccountContainer extends PureComponent {
  componentDidUpdate(prevProps) {
    const {userUpdated, snackbar, error} = this.props;

    if (userUpdated !== prevProps.userUpdated) {
      if (userUpdated) {
        snackbar.showSnackbar({
          message: 'User information updated successfully',
        });
        this.goToProfile();
      }
    }

    if (error.length !== prevProps.error.length) {
      snackbar.showSnackbar({
        message: 'There was a problem',
      });
    }
  }

  goToProfile = () => {
    this.props.router.push('/admin/profile');
  };
  submitMyForm = null;
  getValues = e => {
    if (this.submitMyForm) {
      this.submitMyForm(e);
    }
  };

  render() {
    const {userInformation, userActions, Authorization} = this.props;
    const initialValues = {
      fullName: userInformation.username,
      emailAddress: userInformation.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
    return (
      <LandingComponent navigation={false}>
        <Title
          titleText="Edit Your Account"
          hideCancelAction={false}
          submitLabel={'Update'}
          cancelClicked={this.goToProfile}
          submitClicked={this.getValues}
        />
        <Formik
          render={_props => {
            this.submitMyForm = _props.submitForm;
            return <Account {..._props} />;
          }}
          initialValues={initialValues}
          validationSchema={AccountSchema}
          onSubmit={values => {
            const {
              confirmPassword: password_confirmation,
              currentPassword: current_password,
              emailAddress: email,
              fullName: name,
              newPassword: password,
            } = values;
            userActions.updateUserInformation({Authorization, name, email});
            userActions.updatePassword({
              Authorization,
              current_password,
              password,
              password_confirmation,
            });
          }}
        />
      </LandingComponent>
    );
  }
}

const mapStateToProps = _state => {
  const {userInformation, updateInformation} = _state.user;
  const {errorsPassword, errorsInfo} = updateInformation;
  let error = [];

  if (errorsInfo && errorsInfo.length > 0) {
    error = errorsInfo;
  }

  if (errorsPassword && errorsPassword.length > 0) {
    error = errorsPassword;
  }

  return {
    error,
    isAuth: _state.user.authorization !== '',
    Authorization: _state.user.authorization,
    userInformation,
    userUpdated:
      updateInformation.successInfo && updateInformation.successPassword,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    userActions: bindActionCreators(user, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
  };
};

AccountContainer.propTypes = {
  Authorization: PropTypes.string,
  error: PropTypes.arrayOf(PropTypes.shape({})),
  isAuth: PropTypes.bool,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
  userActions: PropTypes.shape({
    login: PropTypes.func,
    updateUserInformation: PropTypes.func,
    updatePassword: PropTypes.func,
  }),
  userInformation: PropTypes.shape({
    fullName: PropTypes.string,
    emailAddress: PropTypes.string,
    currentPassword: PropTypes.string,
    newPassword: PropTypes.string,
    confirmPassword: PropTypes.string,
  }),
  userUpdated: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountContainer));
