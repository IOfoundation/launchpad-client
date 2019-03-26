import React, {PureComponent} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';

import LocationForm from './LocationForm';
import LandingComponent from '../Landing';
import Title from '../Title';
import Buttons from '../Buttons';

import {getDate, timeConversion} from '@Utils';
import {accesibility} from '@StaticData/data';

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
      day: Yup.string(),
      opensAt: Yup.string(),
      closesAt: Yup.string(),
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

const emptyPhone = {
  phoneNumber: '',
  ext: '',
  vanityNumber: '',
  numberType: '',
  department: '',
  countryExt: '',
};

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
  },
};

class LocationFormContainer extends PureComponent {
  _submit;
  _apiData;
  _getAddress(address) {
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
    return schedule.map(hour => {
      const open = getDate(hour.opens_at);
      const closes = getDate(hour.closes_at);

      return {
        id: hour.id,
        closesAt: timeConversion(closes.time),
        closes,
        day: 'Option One',
        opensAt: timeConversion(open.time),
        open,
      };
    });
  }

  _getApiHours(schedule) {
    return schedule.map(hour => {
      return {
        id: hour.id,
        weekday: hour.open.day,
        opens_at: hour.open.fullDate,
        closes_at: hour.closes.fullDate,
      };
    });
  }

  _getPhones(phones) {
    if (phones.length > 0) {
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
    return [{...emptyPhone}];
  }

  _putPhones(phones) {
    return phones.map(phone => {
      const mappedPhone = {
        department: phone.department,
        extension: phone.ext,
        number_type: phone.numberType,
        number: phone.phoneNumber,
        vanity_number: phone.vanityNumber,
        country_prefix: phone.countryExt,
        _destroy: false,
      };

      if (phone.id) {
        mappedPhone.id = phone.id;
      }

      return mappedPhone;
    });
  }

  _getApiPhones(phones) {
    return phones.map(phone => ({
      id: phone.id,
      department: phone.department,
      extension: phone.ext,
      number: phone.phoneNumber,
      number_type: phone.numberType,
      vanity_number: phone.vanityNumber,
    }));
  }

  _getAccessibility(options) {
    return options.reduce((acc, option) => {
      const activeAccesibility = accesibility.find(
        data => option === data.value
      );
      acc[activeAccesibility.key] = true;
      return acc;
    }, initialValues.accessibility);
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
      ...initialValues,
      locationName: data.name || '',
      alternateName: data.alternate_name || '',
      locationDescription: data.description || '',
      locationEmail: data.email || '',
      locationWebsite: data.website || '',
      streetAddress: this._getAddress(data.address),
      mailingAddress: this._getAddress(data.mail_address),
      phones: this._getPhones(data.phones),
      hoursRegular: this._getHours(data.regular_schedules),
      hoursHolidays: this._getHours(data.holiday_schedules),
      services: data.services.map(service => ({
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

  _formToApi = data => {
    return {
      id: this._apiData.id,
      active: this._apiData.active,
      admin_emails: this._apiData.admin_emails,
      alternate_name: data.alternateName,
      coordinates: this._apiData.coordinates,
      description: data.description,
      latitude: this._apiData.latitude,
      longitude: this._apiData.longitude,
      name: data.name,
      short_desc: this._apiData.short_desc,
      slug: this._apiData.slug,
      website: data.locationWebsite,
      updated_at: getDate().fullDate,
      url: this._apiData.url,
      accessibility: this._getAccessibilityNames(data.accessibility),
      email: data.locationEmail,
      languages: data.languages,
      transportation: data.transportation,
      address: this._getApiAddress(data.streetAddress),
      organization: this._apiData.organization,
      phones: this._getApiPhones(data.phones),
      contacts: this._apiData.contacts,
      mail_address: this._getApiAddress(data.mailingAddress),
      regular_schedules: this._getApiHours(data.hoursRegular),
      holiday_schedules: this._getApiHours(data.hoursHolidays),
    };
  };

  saveLocation = () => {
    this._submit();
  };

  render() {
    const {data, breakpoint} = this.props;

    return (
      <LandingComponent navigation={false}>
        <Title
          cancelClicked={goToLocation}
          hideCancelAction={false}
          submitLabel={'Save location'}
          titleText="Create A Location"
          cancelClicked={this.goToLocation}
          submitClicked={this.saveLocation}
        />
        <Formik
          enableReinitialize={true}
          initialValues={this._dataToForm(data)}
          onSubmit={values => {
            const form = this._formToApi(values);
            console.log(values);
            console.log(form);
          }}
          render={_props => {
            this._submit = _props.handleSubmit;
            return <LocationForm {..._props} breakpoint={breakpoint} />;
          }}
          validateOnChange={true}
          validationSchema={LocationSchema}
        />
        <Buttons
          cancelClicked={this.goToLocation}
          hideCancelAction={false}
          submitLabel={'Save location'}
        />
      </LandingComponent>
    );
  }
}

LocationFormContainer.propTypes = {
  breakpoint: PropTypes.string,
  data: PropTypes.shape({}),
  error: PropTypes.bool,
  isAuth: PropTypes.bool,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default withRouter(LocationFormContainer);
