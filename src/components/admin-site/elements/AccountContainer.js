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
import Modal from './Account/Modal';

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
  state = {
    openModal: false,
  };

  componentDidUpdate(prevProps) {
    const {userUpdated, error, deleteAccountError, userDeleted} = this.props;
    const deleteErrors = Object.keys(deleteAccountError);
    const prevDeleteErrors = Object.keys(prevProps.deleteAccountError);

    this._userUpdatedSuccess(userUpdated, prevProps);
    this._userDeletedSuccess(userDeleted, prevProps);
    this._generalError(error, prevProps);
    this._deleteError(deleteErrors, prevDeleteErrors);
  }

  submitMyForm = null;

  _userDeletedSuccess = (userDeleted, prevProps) => {
    if (userDeleted !== prevProps.userDeleted) {
      if (userDeleted) {
        this.props.snackbar.showSnackbar({
          message: 'User was deleted successfully',
        });
        this.goToSignUp();
      }
    }
  };

  _userUpdatedSuccess = (userUpdated, prevProps) => {
    if (userUpdated !== prevProps.userUpdated) {
      if (userUpdated) {
        this.props.snackbar.showSnackbar({
          message: 'User information updated successfully',
        });
        this.goToProfile();
      }
    }
  };

  _generalError = (error, prevProps) => {
    if (error.length !== prevProps.error.length) {
      if (error.length > 0) {
        this.props.snackbar.showSnackbar({
          message: 'There was a problem',
        });
      }
    }
  };

  _deleteError = (deleteErrors, prevDeleteErrors) => {
    if (deleteErrors.length !== prevDeleteErrors.length) {
      if (deleteErrors.length > 0) {
        this.props.snackbar.showSnackbar({
          message: 'There was a problem while deleting your account',
        });
      }
    }
  };

  goToProfile = () => {
    this.props.router.push('/admin/profile');
  };

  goToSignUp = () => {
    this.props.router.push('/admin-login/sign-up');
  };

  getValues = e => {
    if (this.submitMyForm) {
      this.submitMyForm(e);
    }
  };

  deleteUser = () => {
    const {Authorization, userActions} = this.props;

    userActions.deleteAccount({Authorization});
  };

  handlerModalVisibility = () => {
    this.setState(prevState => {
      return {
        openModal: !prevState.openModal,
      };
    });
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
    const {openModal} = this.state;

    return (
      <LandingComponent navigation={false}>
        <Modal
          open={openModal}
          modalClosed={this.handlerModalVisibility}
          cancelClicked={this.handlerModalVisibility}
          deleteClicked={this.deleteUser}
        />
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
            return (
              <Account {..._props} closeClicked={this.handlerModalVisibility} />
            );
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
  const {errorsPassword, errorsInfo, errorsDelete} = updateInformation;
  let error = [];
  let deleteAccountError = {};

  if (errorsInfo && errorsInfo.length > 0) {
    error = errorsInfo;
  }

  if (errorsPassword && errorsPassword.length > 0) {
    error = errorsPassword;
  }

  if (errorsDelete && Object.keys(errorsDelete).length > 0) {
    deleteAccountError = errorsDelete;
  }

  return {
    error,
    isAuth: _state.user.authorization !== '',
    Authorization: _state.user.authorization,
    userInformation,
    userUpdated:
      updateInformation.successInfo && updateInformation.successPassword,
    userDeleted: updateInformation.successDelete,
    deleteAccountError,
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
  deleteAccountError: PropTypes.shape({}),
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
    deleteAccount: PropTypes.func,
  }),
  userDeleted: PropTypes.bool,
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
