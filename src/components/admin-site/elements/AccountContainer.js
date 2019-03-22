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
  newPassword: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], "Password don't match")
    .required('Required'),
});

class AccountContainer extends PureComponent {
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
    const {userInformation} = this.props;
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
            console.log(values);
          }}
        >
          {}
        </Formik>
      </LandingComponent>
    );
  }
}

const mapStateToProps = _state => {
  return {
    error: _state.user.error,
    isAuth: _state.user.authorization !== '',
    userInformation: _state.user.userInformation,
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
  userInformation: PropTypes.shape({
    fullName: PropTypes.string,
    emailAddress: PropTypes.string,
    currentPassword: PropTypes.string,
    newPassword: PropTypes.string,
    confirmPassword: PropTypes.string,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountContainer));
