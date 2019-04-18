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
    this.is_primary = isMainLocation;

    if (locationName) {
      this.name = locationName;
    }

    if (alternateName) {
      this.alternate_name = alternateName;
    }

    if (locationDescription) {
      this.description = locationDescription;
    }

    if (locationEmail) {
      this.email = locationEmail;
    }

    if (locationWebsite) {
      this.website = locationWebsite;
    }

    if (streetAddress.address) {
      if (streetAddress.isVirtual === false) {
        this.virtual = false;
        this.address_attributes = this._getAddress(streetAddress);
      } else {
        this.virtual = true;
      }
    } else {
      this.virtual = streetAddress.isVirtual;
    }

    if (mailingAddress.address) {
      this.mail_address_attributes = this._getAddress(mailingAddress);
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
      this.regular_schedules_attributes = this._getApiHours(
        hoursRegular,
        delete_hoursRegular
      );
    }

    if (hoursHolidays.length > 0 || delete_hoursHolidays.length > 0) {
      this.holiday_schedules_attributes = this._getHolidayHours(
        hoursHolidays,
        delete_hoursHolidays
      );
    }

    if ((phones && phones.length > 0) || deletedPhones.length > 0) {
      this.phones_attributes = this._getApiPhones(phones, deletedPhones);
    }
  }

  _getAddress(address) {
    const mapped = {
      address_1: address.address,
      address_2: address.address2,
      city: address.city,
      country: 'US',
      postal_code: address.zip,
      state_province: address.state,
    };

    if (address.attention) {
      mapped.attention = address.attention;
    }

    return mapped;
  }

  _getApiHours(schedules, deleted) {
    let mapped = schedules.map(schedule => {
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

    if (deleted.length > 0) {
      mapped = [...mapped, ...deleted];
    }

    return mapped;
  }

  _getHolidayHours(schedules, deleted) {
    let mapped = schedules.map(schedule => {
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

    if (deleted.length > 0) {
      mapped = [...mapped, ...deleted];
    }

    return mapped;
  }

  _getApiPhones(phones, deleted) {
    let mapped = phones.map(phone => {
      const mapPhone = {
        department: phone.department,
        extension: phone.ext,
        number: phone.phoneNumber,
        number_type: phone.numberType,
        vanity_number: phone.vanityNumber,
        country_prefix: phone.countryExt,
      };

      if (phone.id) {
        mapPhone.id = phone.id;
      }

      return mapPhone;
    });

    if (deleted.length > 0) {
      mapped = [...mapped, ...deleted];
    }

    return mapped;
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
