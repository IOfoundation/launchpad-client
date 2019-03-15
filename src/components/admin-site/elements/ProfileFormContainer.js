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

import * as user from 'Actions/user';
import * as snackbarActions from 'Actions/snackbar';

const SignupSchema = Yup.object().shape({
  contactEmail: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  organizationName: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  website: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  accreditations: Yup.string().required('Required'),
  dateIncorporation: Yup.string().required('Required'),
  legalStatus: Yup.string().required('Required'),
  fundingSources: Yup.string().required('Required'),
  licenses: Yup.string().required('Required'),
  taxIdentifier: Yup.string().required('Required'),
  taxStatus: Yup.string().required('Required'),
  twitter: Yup.string(),
  facebook: Yup.string(),
  linkedin: Yup.string(),
  phones: Yup.array()
    .of(
      Yup.object().shape({
        phoneNumber: Yup.string().required('Required'),
        ext: Yup.string().required('Required'),
        vanityNumber: Yup.string().required('Required'),
        numberType: Yup.string().required('Required'),
        department: Yup.string(),
        countryExt: Yup.string(),
      })
    )
    .required('Must have phones'),
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
      phoneNumber: '1',
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
    <LandingComponent>
      <Title />
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
