import React from 'react';
import LocationForm from './LocationForm';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';

import * as user from '../../../actions/user';
import * as snackbarActions from '../../../actions/snackbar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import LandingComponent from '../Landing';
import Title from '../Title';

const SignupSchema = Yup.object().shape({
  locationName: Yup.string().required('Required'),
  alternateName: Yup.string().required('Required'),
  locationDescription: Yup.string().required('Required'),
  isMainLocation: Yup.boolean,
  locationEmail: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  locationWebsite: Yup.string().required('Required'),
  services: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Required'),
      id: Yup.string().required('Required'),
    })
  ),
  streetAddress: Yup.object().shape({
    address: Yup.string().required('Required'),
    address2: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    zip: Yup.string().required('Required'),
  }),
  mailingAddress: Yup.object().shape({
    attention: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    address2: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    zip: Yup.string().required('Required'),
  }),
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
  languages: Yup.string(),
  hours: Yup.object().shape({
    regular: Yup.array().of(
      Yup.object().shape({
        day: Yup.string().required('Required'),
        opensAt: Yup.string().required('Required'),
        closesAt: Yup.string().required('Required'),
      })
    ),
    holidays: Yup.array().of(
      Yup.object().shape({
        day: Yup.string().required('Required'),
        opensAt: Yup.string().required('Required'),
        closesAt: Yup.string().required('Required'),
      })
    ),
  }),
  transportation: Yup.string(),
  accessibility: Yup.string(),
});

const initialValues = {
  locationName: '',
  alternateName: '',
  locationDescription: '',
  isMainLocation: false,
  locationEmail: '',
  locationWebsite: '',
  services: [],
  streetAddress: {
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  },
  mailingAddress: {
    attention: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  },
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
  languages: [],
  hours: {
    regular: [
      {
        day: '',
        opensAt: '',
        closesAt: '',
      },
    ],
    holidays: [],
  },
  transportation: '',
  accessibility: '',
};

const LocationFormContainer = () => {
  return (
    <LandingComponent>
      <Title />
      <Formik
        render={_props => <LocationForm {..._props} />}
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

LocationFormContainer.propTypes = {
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
)(withRouter(LocationFormContainer));
