export const getApiHours = (schedules, deleted) => {
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
};

export const getHolidayHours = (schedules, deleted) => {
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
};

export const getApiPhones = (phones, deleted) => {
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
};
