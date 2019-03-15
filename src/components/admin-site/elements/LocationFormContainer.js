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
import Buttons from '../Buttons';

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
    attention: Yup.string(),
    address: Yup.string(),
    address2: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zip: Yup.string(),
  }),
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
  languages: Yup.string().required('Required'),
  hours: Yup.object().shape({
    regular: Yup.array().of(
      Yup.object().shape({
        day: Yup.string(),
        opensAt: Yup.string(),
        closesAt: Yup.string(),
      })
    ),
    holidays: Yup.array().of(
      Yup.object().shape({
        day: Yup.string(),
        opensAt: Yup.string(),
        closesAt: Yup.string(),
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
        render={_props => <LocationForm {..._props} />}
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={() => {}}
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
