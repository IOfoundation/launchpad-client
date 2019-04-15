import {accesibility} from '@StaticData/data';

class Location {
  constructor({
    locationName,
    alternateName,
    locationDescription,
    isMainLocation,
    locationEmail,
    locationWebsite,
    streetAddress,
    mailingAddress,
    phones,
    languages,
    hoursRegular,
    hoursHolidays,
    transportation,
    accessibility,
  }) {
    if (locationName) {
      this.name = locationName;
    }

    if (alternateName) {
      this.alternate_name = alternateName;
    }

    if (locationDescription) {
      this.description = locationDescription;
    }

    this.active = isMainLocation;

    if (locationEmail) {
      this.email = locationEmail;
    }

    if (locationWebsite) {
      this.website = locationWebsite;
    }

    if (streetAddress.address) {
      this.address_attributes = {
        address_1: streetAddress.address,
        address_2: streetAddress.address2,
        city: streetAddress.city,
        country: 'US',
        postal_code: streetAddress.zip,
        state_province: streetAddress.state,
      };
    }

    if (mailingAddress.address) {
      this.mail_address_attributes = {
        address_1: mailingAddress.address,
        address_2: mailingAddress.address2,
        city: mailingAddress.city,
        country: 'US',
        postal_code: mailingAddress.zip,
        state_province: mailingAddress.state,
      };
    }

    if (languages.length > 0) {
      this.languages = languages;
    }

    if (transportation) {
      this.transportation = transportation;
    }

    const accessibilityNames = this._getAccessibilityNames(accessibility);

    if (accessibilityNames.length > 0) {
      this.accessibility = accessibilityNames;
    }

    if (hoursRegular.length > 0) {
      this.regular_schedules_attributes = this._getApiHours(hoursRegular);
    }

    if (hoursHolidays.length > 0) {
      this.holiday_schedules_attributes = this._getApiHours(hoursHolidays);
    }

    if (phones.length > 1 || phones[0].phoneNumber) {
      this.phones_attributes = this._getApiPhones(phones);
    }

    this.virtual = true;
  }

  _getApiHours(schedule) {
    return schedule.map(hour => {
      return {
        weekday: hour.open.day,
        opens_at: hour.open.fullDate,
        closes_at: hour.closes.fullDate,
      };
    });
  }

  _getApiPhones(phones) {
    return phones.map(phone => ({
      department: phone.department,
      extension: phone.ext,
      number: phone.phoneNumber,
      number_type: phone.numberType,
      vanity_number: phone.vanityNumber,
    }));
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
}

export default Location;
