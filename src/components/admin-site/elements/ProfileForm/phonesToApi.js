import {sortArrayBy, falsyToString} from '@Utils';

export const getPhonesToApi = phones => {
  if (phones && phones.length > 0) {
    const sorted = sortArrayBy(phones, 'id');

    return sorted.map(phone => ({
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
};
