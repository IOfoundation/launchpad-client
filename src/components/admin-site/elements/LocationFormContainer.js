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
  _getAddres(address) {
    return {
      address: (address && address.address_1) || '',
      address2: (address && address.address_2) || '',
      city: (address && address.city) || '',
      state: (address && address.state_province) || '',
      zip: (address && address.postal_code) || '',
      attention: (address && address.attention) || '',
    };
  }

  _getHours(schedule) {
    return schedule.map(hour => {
      const open = getDate(hour.opens_at);
      const closes = getDate(hour.closes_at);

      return {
        closesAt: timeConversion(closes.time),
        day: 'Option One',
        opensAt: timeConversion(open.time),
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

  _getAccessibility(options) {
    return options.reduce((acc, option) => {
      const activeAccesibility = accesibility.find(
        data => option === data.value
      );
      acc[activeAccesibility.key] = true;
      return acc;
    }, initialValues.accessibility);
  }

  _dataToForm(data) {
    return {
      ...initialValues,
      locationName: data.name || '',
      alternateName: data.alternate_name || '',
      locationDescription: data.description || '',
      locationEmail: data.email || '',
      locationWebsite: data.website || '',
      streetAddress: this._getAddres(data.address),
      mailingAddress: this._getAddres(data.mail_address),
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

  render() {
    const {data, breakpoint} = this.props;

    return (
      <LandingComponent navigation={false}>
        <Title
          cancelClicked={goToLocation}
          hideCancelAction={false}
          submitLabel={'Save location'}
          titleText="Create A Location"
        />
        <Formik
          enableReinitialize={true}
          initialValues={this._dataToForm(data)}
          onSubmit={() => {}}
          render={_props => (
            <LocationForm {..._props} breakpoint={breakpoint} />
          )}
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
