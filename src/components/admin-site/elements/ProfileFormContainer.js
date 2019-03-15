import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

import ProfileForm from './ProfileForm';
import LandingComponent from '../Landing';
import Title from '../Title';

import * as user from '@Actions/user';
import * as snackbarActions from '@Actions/snackbar';

const SignupSchema = Yup.object().shape({
  contactEmail: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  organizationName: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  website: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  accreditations: Yup.string(),
  dateIncorporation: Yup.string(),
  legalStatus: Yup.string(),
  fundingSources: Yup.string(),
  licenses: Yup.string(),
  taxIdentifier: Yup.string(),
  taxStatus: Yup.string(),
  twitter: Yup.string(),
  facebook: Yup.string(),
  linkedin: Yup.string(),
  phones: Yup.array().of(
    Yup.object().shape({
      phoneNumber: Yup.string(),
      ext: Yup.string(),
      vanityNumber: Yup.string(),
      numberType: Yup.string(),
      department: Yup.string(),
      countryExt: Yup.string(),
    })
  ),
});

const initialValues = {
  password: '',
  contactEmail: '',
  organizationName: '',
  name: '',
  website: '',
  description: '',
  accreditations: '',
  dateIncorporation: '',
  legalStatus: '',
  fundingSources: '',
  licenses: '',
  taxIdentifier: '',
  taxStatus: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  phones: [
    {
      phoneNumber: '',
      ext: '',
      vanityNumber: '',
      numberType: '',
      department: '',
      countryExt: '',
    },
  ],
};

const ProfileFormContainer = () => {
  return (
    <LandingComponent navigation={true}>
      <Title
        titleText="Profile"
        hideCancelAction={false}
        submitLabel={'Save Changes'}
      />
      <Formik
        render={_props => <ProfileForm {..._props} />}
        initialValues={initialValues}
        validationSchema={SignupSchema}
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
