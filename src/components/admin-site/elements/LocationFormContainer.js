import React, {PureComponent, Fragment} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LocationForm from './LocationForm';
import LandingComponent from '../Landing';
import Title from '../Title';
import Buttons from '../Buttons';

import {falsyToString} from '@Utils';
import {accesibility} from '@StaticData/data';
import Loading from '@Shared/Loading';
import * as locationCreateActions from '@Actions/locations/create';
import * as snackbarActions from '@Actions/snackbar';
import LocationModel from './Locations/Model';

const LocationSchema = Yup.object().shape({
  locationName: Yup.string().required('Required'),
  alternateName: Yup.string().required('Required'),
  locationDescription: Yup.string().required('Required'),
  isMainLocation: Yup.boolean().nullable(),
  locationEmail: Yup.string()
    .email('Invalid email address')
    .notRequired(),
  locationWebsite: Yup.string()
    .url()
    .notRequired(),
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
  languages: Yup.string(),
  hoursRegular: Yup.array().of(
    Yup.object().shape({
      day: Yup.string(),
      opensAt: Yup.string(),
      closesAt: Yup.string(),
    })
  ),
  hoursHolidays: Yup.array().of(
    Yup.object().shape({
      closed: Yup.string(),
      closesAt: Yup.string(),
      endDate: Yup.string(),
      opensAt: Yup.string(),
      startDate: Yup.string(),
    })
  ),
  transportation: Yup.string(),
  accessibility: Yup.object().shape({
    cd: Yup.boolean(),
    deafInterpreter: Yup.boolean(),
    disabledParking: Yup.boolean(),
    elevator: Yup.boolean(),
    ramp: Yup.boolean(),
    restroom: Yup.boolean(),
    tapeBraille: Yup.boolean(),
    tty: Yup.boolean(),
    wheelchair: Yup.boolean(),
    wheelchairVan: Yup.boolean(),
  }),
});

const emptyAccesibility = {
  cd: false,
  deafInterpreter: false,
  disabledParking: false,
  elevator: false,
  ramp: false,
  restroom: false,
  tapeBraille: false,
  tty: false,
  wheelchair: false,
  wheelchairVan: false,
};

const emtpyStreetAddress = {
  address: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
};

const emptyMailingAddress = {
  attention: '',
  address: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
};

const getInitialValues = () => {
  return {
    locationName: '',
    alternateName: '',
    locationDescription: '',
    isMainLocation: false,
    locationEmail: '',
    locationWebsite: '',
    services: [],
    streetAddress: {
      ...emtpyStreetAddress,
    },
    mailingAddress: {
      ...emptyMailingAddress,
    },
    phones: [],
    languages: [],
    hoursRegular: [],
    hoursHolidays: [],
    transportation: '',
    accessibility: {...emptyAccesibility},
    deletedPhones: [],
    delete_hoursRegular: [],
    delete_hoursHolidays: [],
  };
};

class LocationFormContainer extends PureComponent {
  componentDidUpdate(prevProps) {
    const {error, errors, snackbar, success, router} = this.props;

    if (error !== prevProps.error) {
      let message = 'An error has ocurred';

      if (errors.length > 0 && errors[0].title) {
        message = errors[0].title;
      }

      if (error) {
        snackbar.showSnackbar({
          message,
        });
      }
    }

    if (success !== prevProps.success) {
      if (success) {
        snackbar.showSnackbar({
          message: 'Location created/updated succesfully',
        });
        router.push('/admin/location');
      }
    }
  }

  _submit;
  _apiData;

  _getAddress(address) {
    if (!address) {
      return {
        ...emtpyStreetAddress,
      };
    }

    return {
      id: address.id,
      address: (address && address.address_1) || '',
      address2: (address && address.address_2) || '',
      city: (address && address.city) || '',
      state: (address && address.state_province) || '',
      zip: (address && address.postal_code) || '',
      attention: (address && address.attention) || '',
    };
  }

  _getApiAddress(address) {
    return {
      id: address.id,
      address_1: address.address,
      address_2: address.address2,
      city: address.city,
      state_province: address.state,
      postal_code: address.zip,
    };
  }

  _getHours(schedule) {
    if (!schedule) {
      return [];
    }
    return schedule.map(hour => {
      const open = hour.opens_at.split('T')[1].split('.')[0];
      const closes = hour.closes_at.split('T')[1].split('.')[0];

      return {
        id: hour.id,
        closesAt: closes,
        day: hour.weekday,
        opensAt: open,
      };
    });
  }

  _getHolidays(holidays) {
    if (!holidays) {
      return [];
    }

    return holidays.map(holiday => {
      const clean = Object.keys(holiday).reduce((acc, key) => {
        acc[key] = falsyToString(holiday[key]);
        return acc;
      }, {});
      const open = clean.opens_at && clean.opens_at.split('T')[1].split('.')[0];
      const closes =
        clean.closes_at && clean.closes_at.split('T')[1].split('.')[0];
      const startDate = clean.start_date && clean.start_date.split('T')[0];
      const endDate = clean.end_date && clean.end_date.split('T')[0];

      return {
        closed: holiday.closed ? 'true' : 'false',
        closesAt: closes || '',
        endDate: endDate || '',
        id: holiday.id,
        opensAt: open || '',
        startDate: startDate || '',
      };
    });
  }

  _getPhones(phones) {
    if (phones && phones.length > 0) {
      return phones.map(phone => ({
        id: phone.id,
        department: falsyToString(phone.department),
        ext: falsyToString(phone.extension),
        numberType: falsyToString(phone.number_type),
        phoneNumber: falsyToString(phone.number),
        vanityNumber: falsyToString(phone.vanity_number),
        countryExt: falsyToString(phone.country_prefix),
      }));
    }
    return [];
  }

  _getAccessibility(options) {
    if (!options) {
      return {...emptyAccesibility};
    }

    return options.reduce(
      (acc, option) => {
        const activeAccesibility = accesibility.find(
          data => option === data.value
        );
        acc[activeAccesibility.key] = true;
        return acc;
      },
      {...emptyAccesibility}
    );
  }

  _getAccessibilityNames(checked) {
    return Object.keys(checked).reduce((acc, key) => {
      if (checked[key]) {
        const activeAccesibility = accesibility.find(data => key === data.key);
        acc.push(activeAccesibility.value);
      }

      return acc;
    }, []);
  }

  _dataToForm(data) {
    this._apiData = data;

    return {
      ...getInitialValues(),
      locationName: data.name || '',
      alternateName: data.alternate_name || '',
      locationDescription: data.description || '',
      locationEmail: data.email || '',
      locationWebsite: data.website || '',
      isMainLocation: Boolean(data.is_primary),
      streetAddress: this._getAddress(data.address),
      mailingAddress: this._getAddress(data.mail_address),
      phones: this._getPhones(data.phones),
      hoursRegular: this._getHours(data.regular_schedules),
      hoursHolidays: this._getHolidays(data.holiday_schedules),
      services:
        data.services &&
        data.services.map(service => ({
          id: service.id,
          name: service.name,
        })),
      transportation: data.transportation || '',
      languages: data.languages || [],
      accessibility: this._getAccessibility(data.accessibility),
    };
  }

  goToLocation = () => {
    this.props.router.push('/admin/location');
  };

  _newLocationToApi = data => {
    return new LocationModel(data);
  };

  saveLocation = () => {
    this._submit();
  };

  _getForm = (mode, locationId) => {
    const {
      data,
      breakpoint,
      loadingFinished,
      locationActions,
      Authorization,
      organizationId,
    } = this.props;
    let _initialValues;

    if (mode === 'new') {
      _initialValues = getInitialValues();
    } else if (loadingFinished) {
      _initialValues = this._dataToForm(data);
    }

    return (
      <Formik
        enableReinitialize={true}
        initialValues={_initialValues}
        onSubmit={values => {
          const location = this._newLocationToApi(values);

          if (mode === 'new') {
            locationActions.createLocation({
              Authorization,
              organizationId,
              location,
              mode: 'new',
            });
          } else if (mode === 'edit') {
            locationActions.createLocation({
              Authorization,
              organizationId,
              locationId,
              location,
              mode: 'edit',
            });
          }
        }}
        render={_props => {
          return (
            <Fragment>
              <Title
                hideCancelAction={false}
                submitLabel={'Save location'}
                titleText="Create A Location"
                cancelClicked={this.goToLocation}
                submitClicked={_props.submitForm}
              />
              <LocationForm {..._props} breakpoint={breakpoint} />
              <Buttons
                cancelClicked={this.goToLocation}
                hideCancelAction={false}
                submitClicked={_props.submitForm}
                submitLabel={'Save location'}
              />
            </Fragment>
          );
        }}
        validateOnChange={true}
        validationSchema={LocationSchema}
      />
    );
  };

  render() {
    const {router, loadingFinished} = this.props;
    let form = <Loading />;

    if (router.params.id === 'new') {
      form = this._getForm('new');
    } else if (loadingFinished) {
      form = this._getForm('edit', router.params.id);
    }

    return <LandingComponent navigation={false}>{form}</LandingComponent>;
  }
}

const mapStateToProps = _state => {
  const organizationId =
    String(_state.user.organizationId) ||
    sessionStorage.getItem('organizationId');
  const Authorization =
    _state.user.authorization || sessionStorage.getItem('userAuth');

  return {
    Authorization,
    organizationId,
    error: _state.locationCreate.error,
    errors: _state.locationCreate.errors,
    locationUpdated: _state.locationCreate.location,
    success: _state.locationCreate.success,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    locationActions: bindActionCreators(locationCreateActions, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
  };
};

LocationFormContainer.propTypes = {
  Authorization: PropTypes.string,
  breakpoint: PropTypes.string,
  data: PropTypes.shape({}),
  error: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.shape({})),
  isAuth: PropTypes.bool,
  loadingFinished: PropTypes.bool,
  locationActions: PropTypes.shape({
    createLocation: PropTypes.func,
  }),
  locationUpdated: PropTypes.shape({}),
  organizationId: PropTypes.string,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
  success: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LocationFormContainer));
