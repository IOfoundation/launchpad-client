import {accesibility} from '@StaticData/data';

class Location {
  constructor({
    accessibility,
    alternateName,
    deletedPhones,
    hoursHolidays,
    hoursRegular,
    isMainLocation,
    languages,
    locationDescription,
    locationEmail,
    locationName,
    locationWebsite,
    mailingAddress,
    phones,
    streetAddress,
    transportation,
    delete_hoursRegular,
    delete_hoursHolidays,
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

    if (hoursRegular.length > 0 || delete_hoursRegular.length > 0) {
      this.regular_schedules_attributes = this._getApiHours(hoursRegular);

      if (delete_hoursRegular.length > 0) {
        this.regular_schedules_attributes = [
          ...this.regular_schedules_attributes,
          ...delete_hoursRegular,
        ];
      }
    }

    if (hoursHolidays.length > 0 || delete_hoursHolidays.length > 0) {
      this.holiday_schedules_attributes = this._getHolidayHours(hoursHolidays);

      if (delete_hoursHolidays.length > 0) {
        this.holiday_schedules_attributes = [
          ...this.holiday_schedules_attributes,
          ...delete_hoursHolidays,
        ];
      }
    }

    if (phones && phones.length > 1) {
      this.phones_attributes = this._getApiPhones(phones);

      if (deletedPhones.length > 0) {
        this.phones_attributes = [...this.phones_attributes, ...deletedPhones];
      }
    }

    this.virtual = true;
  }

  _getApiHours(schedules) {
    return schedules.map(schedule => {
      const mapSchedule = {
        weekday: schedule.day,
        opens_at: schedule.opensAt,
        closes_at: schedule.closesAt,
      };

      if (schedule.id) {
        mapSchedule.id = schedule.id;
      }

      return mapSchedule;
    });
  }

  _getHolidayHours(schedules) {
    return schedules.map(schedule => {
      const mapSchedule = {
        closes_at: schedule.closesAt,
        end_date: schedule.endDate,
        opens_at: schedule.opensAt,
        start_date: schedule.startDate,
      };

      if (schedule.closed === 'true') {
        mapSchedule.closed = true;
      } else if (schedule.closed === 'false') {
        mapSchedule.closed = false;
      }

      if (schedule.id) {
        mapSchedule.id = schedule.id;
      }

      return mapSchedule;
    });
  }

  _getApiPhones(phones) {
    return phones.map(phone => {
      const mapPhone = {
        department: phone.department,
        extension: phone.ext,
        number: phone.phoneNumber,
        number_type: phone.numberType,
        vanity_number: phone.vanityNumber,
      };

      if (phone.id) {
        mapPhone.id = phone.id;
      }

      return mapPhone;
    });
  }

  _getAccessibilityNames(checked) {
    return Object.keys(checked).reduce((acc, key) => {
      if (checked[key]) {
        const activeAccesibility = accesibility.find(data => key === data.key);
        acc.push(activeAccesibility.apiValue);
      }

      return acc;
    }, []);
  }
}

export default Location;
