import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

import LocationForm from './LocationForm';
import LandingComponent from '../Landing';
import Title from '../Title';
import Buttons from '../Buttons';

import * as user from '@Actions/user';
import * as snackbarActions from '@Actions/snackbar';

const LocationSchema = Yup.object().shape({
  locationName: Yup.string().required('Required'),
  alternateName: Yup.string().required('Required'),
  locationDescription: Yup.string().required('Required'),
  isMainLocation: Yup.boolean(),
  locationEmail: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  locationWebsite: Yup.string().required('Required'),
  services: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      id: Yup.string(),
    })
  ),
  streetAddress: Yup.object().shape({
    address: Yup.string(),
    address2: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zip: Yup.string(),
  }),
  mailingAddress: Yup.object().shape({
    address: Yup.string(),
    address2: Yup.string(),
    attention: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zip: Yup.string(),
  }),
  phones: Yup.array().of(
    Yup.object().shape({
      countryExt: Yup.string(),
      department: Yup.string(),
      ext: Yup.string(),
      numberType: Yup.string(),
      phoneNumber: Yup.string(),
      vanityNumber: Yup.string(),
    })
  ),
  languages: Yup.array()
    .of(Yup.string())
    .required('Required'),
  hoursRegular: Yup.array().of(
    Yup.object().shape({
      countryExt: Yup.string(),
      department: Yup.string(),
      ext: Yup.string(),
      numberType: Yup.string(),
      phoneNumber: Yup.string(),
      vanityNumber: Yup.string(),
    })
  ),
  hoursHolidays: Yup.array().of(
    Yup.object().shape({
      countryExt: Yup.string(),
      department: Yup.string(),
      ext: Yup.string(),
      numberType: Yup.string(),
      phoneNumber: Yup.string(),
      vanityNumber: Yup.string(),
    })
  ),
  transportation: Yup.string(),
  accessibility: Yup.object().shape({
    disabledParking: Yup.boolean(),
    elevator: Yup.boolean(),
    informationOnCd: Yup.boolean(),
    interpreterForTheDeaf: Yup.boolean(),
    ramp: Yup.boolean(),
  }),
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
  hoursRegular: [],
  hoursHolidays: [],
  transportation: '',
  accessibility: {
    informationOnCd: false,
    interpreterForTheDeaf: false,
    disabledParking: false,
    elevator: false,
    ramp: false,
  },
};

const LocationFormContainer = props => {
  const goToLocation = () => {
    props.router.push('/admin/location');
  };

  return (
    <LandingComponent navigation={false}>
      <Title
        titleText="Create A Location"
        hideCancelAction={false}
        submitLabel={'Save location'}
        cancelClicked={goToLocation}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        render={_props => <LocationForm {..._props} />}
        validateOnChange={true}
        validationSchema={LocationSchema}
      />
      <Buttons
        hideCancelAction={false}
        submitLabel={'Save location'}
        cancelClicked={goToLocation}
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
