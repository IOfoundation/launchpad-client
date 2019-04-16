import React, {PureComponent, Fragment} from 'react';
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
import Loading from '@Shared/Loading';

import * as user from '@Actions/user';
import * as snackbarActions from '@Actions/snackbar';

const AccountSchema = Yup.object().shape({
  fullName: Yup.string().required('Required'),
  emailAddress: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  currentPassword: Yup.string().notRequired(),
  newPassword: Yup.string().when('currentPassword', {
    is: val => Boolean(val),
    then: Yup.string()
      .required('Required')
      .min(8, 'New password must be at least 8 characters'),
    otherwise: Yup.string().notRequired(),
  }),
  confirmPassword: Yup.string().when('newPassword', {
    is: val => Boolean(val),
    then: Yup.string()
      .required('Required')
      .oneOf(
        [Yup.ref('newPassword'), null],
        'Confirmation password does not match'
      ),
    otherwise: Yup.string().notRequired(),
  }),
});

class AccountContainer extends PureComponent {
  state = {
    openModal: false,
  };

  componentDidUpdate(prevProps) {
    const {
      userUpdated,
      error,
      deleteAccountError,
      userDeleted,
      passwordUpdated,
    } = this.props;
    const deleteErrors = Object.keys(deleteAccountError);
    const prevDeleteErrors = Object.keys(prevProps.deleteAccountError);

    if (this._checkBothSuccess) {
      this._passwordUpdatedSuccess(userUpdated, passwordUpdated, prevProps);
    } else {
      this._userUpdatedSuccess(userUpdated, prevProps);
    }

    this._userDeletedSuccess(userDeleted, prevProps);
    this._generalError(error, prevProps);
    this._deleteError(deleteErrors, prevDeleteErrors);
  }

  submitMyForm = null;
  _checkBothSuccess = false;

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

  _passwordUpdatedSuccess = (userUpdated, passwordUpdated, prevProps) => {
    const userValidation = userUpdated !== prevProps.userUpdated;
    const passwordValidation = passwordUpdated !== prevProps.passwordUpdated;

    if (userValidation || passwordValidation) {
      if (passwordUpdated && userUpdated) {
        this.props.snackbar.showSnackbar({
          message: 'Password updated successfully',
        });
        this.goToProfile();
      }
    }
  };

  _generalError = (error, prevProps) => {
    if (error.length !== prevProps.error.length) {
      if (error.length > 0) {
        const title = error[0] && error[0].title;

        if (title) {
          this.props.snackbar.showSnackbar({
            message: title,
          });
        } else {
          this.props.snackbar.showSnackbar({
            message: 'There was a problem',
          });
        }
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
    const {openModal} = this.state;
    let form = <Loading />;

    if (Object.keys(userInformation).length > 0) {
      form = (
        <Formik
          render={_props => {
            this.submitMyForm = _props.submitForm;
            return (
              <Fragment>
                <Title
                  titleText="Edit Your Account"
                  hideCancelAction={false}
                  submitLabel={'Update'}
                  cancelClicked={this.goToProfile}
                  submitClicked={this.getValues}
                  disableSubmit={Object.keys(_props.errors).length > 0}
                />
                <Account
                  {..._props}
                  closeClicked={this.handlerModalVisibility}
                />
              </Fragment>
            );
          }}
          initialValues={{
            fullName: userInformation.name || '',
            emailAddress: userInformation.email || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={AccountSchema}
          onSubmit={values => {
            const {
              confirmPassword: password_confirmation,
              currentPassword: current_password,
              emailAddress: email,
              fullName: name,
              newPassword: password,
            } = values;

            if (
              current_password.length > 0 ||
              password.length > 0 ||
              password_confirmation.length > 0
            ) {
              this._checkBothSuccess = true;
              userActions.updatePasswordAndInformation({
                Authorization,
                current_password,
                password,
                password_confirmation,
                name,
                email,
              });
            } else {
              this._checkBothSuccess = false;
              userActions.updateUserInformation({Authorization, name, email});
            }
          }}
        />
      );
    }

    return (
      <LandingComponent navigation={false}>
        <Modal
          open={openModal}
          modalClosed={this.handlerModalVisibility}
          cancelClicked={this.handlerModalVisibility}
          deleteClicked={this.deleteUser}
        />
        {form}
      </LandingComponent>
    );
  }
}

const mapStateToProps = _state => {
  const {updateInformation} = _state.user;

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
    userInformation: _state.userInformation.information,
    userUpdated: updateInformation.successInfo,
    passwordUpdated: updateInformation.successPassword,
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
  passwordUpdated: PropTypes.bool,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
  userActions: PropTypes.shape({
    login: PropTypes.func,
    updateUserInformation: PropTypes.func,
    updatePasswordAndInformation: PropTypes.func,
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
