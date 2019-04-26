import React, {PureComponent, Fragment} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Buttons from '../Buttons';
import LandingComponent from '../Landing';
import Loading from '@Shared/Loading';
import LocationForm from './LocationForm';
import Modal from './Locations/Modal';
import Title from '../Title';

import {falsyToString, getAuthorization} from '@Utils';
import {accesibility} from '@StaticData/data';
import * as locationCreateActions from '@Actions/locations/create';
import * as locationDeleteActions from '@Actions/locations/delete';
import * as snackbarActions from '@Actions/snackbar';
import * as serviceCreateActions from '@Actions/services/create';
import LocationModel from './Locations/Model';

const LocationSchema = Yup.object().shape({
  locationName: Yup.string().required('Required'),
  alternateName: Yup.string().required('Required'),
  locationDescription: Yup.string().required('Required'),
  isMainLocation: Yup.boolean().nullable(),
  locationEmail: Yup.string()
    .email('Invalid Location Email Address')
    .notRequired(),
  locationWebsite: Yup.string()
    .url('Location website must be a valid URL')
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
      closesAt: Yup.string().when('opensAt', {
        is: val => Boolean(val),
        then: Yup.string().test(
          'opensAt',
          'Can\'t be lower or equal to "Opens at"',
          function validateHours(closesAt) {
            const regex = new RegExp(':', 'g');
            const opensAt = this.resolve(Yup.ref('opensAt'));

            return (
              parseInt(opensAt.replace(regex, ''), 10) <
              parseInt(closesAt.replace(regex, ''), 10)
            );
          }
        ),
        otherwise: Yup.string().notRequired(),
      }),
    })
  ),
  hoursHolidays: Yup.array().of(
    Yup.object().shape({
      closed: Yup.string(),
      closesAt: Yup.string().when('opensAt', {
        is: val => Boolean(val),
        then: Yup.string().test(
          'opensAt',
          'Can\'t be lower or equal to "Opens at"',
          function validateHours(closesAt) {
            const regex = new RegExp(':', 'g');
            const opensAt = this.resolve(Yup.ref('opensAt'));

            return (
              parseInt(opensAt.replace(regex, ''), 10) <
              parseInt(closesAt.replace(regex, ''), 10)
            );
          }
        ),
        otherwise: Yup.string().notRequired(),
      }),
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
  isVirtual: false,
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
  state = {
    openModal: false,
  };

  componentDidUpdate(prevProps) {
    const {error, errors, snackbar, success, router} = this.props;

    if (error !== prevProps.error) {
      let message = 'An error has ocurred';
      this._setSubmitting(false);

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
      this._setSubmitting(true);
      const message =
        router.params.id === 'new'
          ? 'Location created succesfully'
          : 'Location updated succesfully';

      if (success) {
        snackbar.showSnackbar({
          message,
        });
        router.push('/admin/location');
      }
    }

    this._verifyDeleteSuccess(prevProps);
    this._verifyDeleteError(prevProps);
  }

  _apiData;
  _setSubmitting;

  _verifyDeleteSuccess = prevProps => {
    const {deleteSucces, snackbar, router} = this.props;

    if (deleteSucces !== prevProps.deleteSucces) {
      if (deleteSucces) {
        snackbar.showSnackbar({
          message: 'Location deleted succesfully',
        });
        router.push('/admin/location');
      }
    }
  };

  _verifyDeleteError = prevProps => {
    const {deleteError, deleteErrors, snackbar} = this.props;

    if (deleteError !== prevProps.deleteError) {
      let message = 'An error has ocurred';

      if (deleteErrors.length > 0 && deleteErrors[0].title) {
        message = deleteErrors[0].title;
      }

      if (deleteError) {
        snackbar.showSnackbar({
          message,
        });
      }
    }
  };

  _getAddress(address, isVirtual) {
    if (!address) {
      return {
        ...emtpyStreetAddress,
        isVirtual,
      };
    }

    return {
      id: address.id,
      isVirtual: address.virtual,
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
      streetAddress: this._getAddress(data.address, data.virtual),
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

  _getForm = (mode, locationId) => {
    const {
      data,
      breakpoint,
      loadingFinished,
      locationActions,
      Authorization,
      organizationId,
      router,
      service,
    } = this.props;
    let _initialValues;
    let sectionTitle;

    if (mode === 'new') {
      sectionTitle = 'Create A Location';
      _initialValues = getInitialValues();
    } else if (loadingFinished) {
      sectionTitle = 'Edit A Location';
      _initialValues = this._dataToForm(data);
    }

    return (
      <Formik
        enableReinitialize={true}
        initialValues={_initialValues}
        onSubmit={(values, {setSubmitting}) => {
          const location = this._newLocationToApi(values);

          this._setSubmitting = setSubmitting;
          this._setSubmitting(true);
          if (mode === 'new') {
            locationActions.createLocation({
              Authorization,
              organizationId,
              locationId,
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
                titleText={sectionTitle}
                cancelClicked={this.goToLocation}
                submitClicked={_props.submitForm}
                disableSubmit={_props.isSubmitting}
              />
              <LocationForm
                {..._props}
                breakpoint={breakpoint}
                deleteClicked={this.handlerModalVisibility}
                mode={mode}
                router={router}
                service={service}
                locationName={_initialValues.locationName}
              />
              <Buttons
                cancelClicked={this.goToLocation}
                hideCancelAction={false}
                submitClicked={_props.submitForm}
                submitLabel={'Save location'}
                disableSubmit={_props.isSubmitting}
              />
            </Fragment>
          );
        }}
        validateOnChange={true}
        validationSchema={LocationSchema}
      />
    );
  };

  _deleteLocation = () => {
    const {locationDelete, router, Authorization} = this.props;

    locationDelete.deleteLocation({
      Authorization,
      locationId: router.params.id,
    });
  };

  handlerModalVisibility = () => {
    this.setState(prevState => {
      return {
        openModal: !prevState.openModal,
      };
    });
  };

  render() {
    const {router, loadingFinished, breakpoint} = this.props;
    const {openModal} = this.state;
    let form = <Loading />;

    if (router.params.id === 'new') {
      form = this._getForm('new');
    } else if (loadingFinished) {
      form = this._getForm('edit', router.params.id);
    }

    return (
      <LandingComponent breakpoint={breakpoint} navigation={false}>
        <Modal
          open={openModal}
          modalClosed={this.handlerModalVisibility}
          cancelClicked={this.handlerModalVisibility}
          deleteClicked={this._deleteLocation}
        />
        {form}
      </LandingComponent>
    );
  }
}

const mapStateToProps = _state => {
  const organizationId =
    _state.user.organizationId || sessionStorage.getItem('organizationId');
  const Authorization = getAuthorization(_state);

  return {
    Authorization,
    organizationId,
    error: _state.locationCreate.error,
    errors: _state.locationCreate.errors,
    locationUpdated: _state.locationCreate.location,
    success: _state.locationCreate.success,
    deleteSucces: _state.locationDelete.success,
    deleteError: _state.locationDelete.error,
    deleteErrors: _state.locationDelete.errors,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    locationActions: bindActionCreators(locationCreateActions, _dispatch),
    locationDelete: bindActionCreators(locationDeleteActions, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
    service: bindActionCreators(serviceCreateActions, _dispatch),
  };
};

LocationFormContainer.propTypes = {
  Authorization: PropTypes.string,
  breakpoint: PropTypes.string,
  data: PropTypes.shape({}),
  deleteError: PropTypes.bool,
  deleteErrors: PropTypes.arrayOf(PropTypes.shape({})),
  deleteSucces: PropTypes.bool,
  error: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.shape({})),
  isAuth: PropTypes.bool,
  loadingFinished: PropTypes.bool,
  locationActions: PropTypes.shape({
    createLocation: PropTypes.func,
  }),
  locationDelete: PropTypes.shape({
    deleteLocation: PropTypes.func,
  }),
  locationUpdated: PropTypes.shape({}),
  organizationId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  service: PropTypes.shape({
    setLocationId: PropTypes.func,
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
