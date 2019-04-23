const formModel = ({
  address,
  address2,
  allDay,
  city,
  description,
  endDate,
  endTime,
  startDate,
  startTime,
  state,
  title,
  website,
  zip,
}) => {
  const mapped = {};

  if (title) {
    mapped.title = title;
  }

  if (address) {
    mapped.street_1 = address;
  }

  if (address2) {
    mapped.street_2 = address2;
  }

  mapped.is_all_day = allDay;

  if (city) {
    mapped.city = city;
  }

  if (description) {
    mapped.body = description;
  }

  if (endDate) {
    if (allDay) {
      mapped.ending_at = endDate;
    } else {
      mapped.ending_at = `${endDate} ${endTime}`;
    }
  }

  if (startDate) {
    if (allDay) {
      mapped.starting_at = startDate;
    } else {
      mapped.starting_at = `${startDate} ${startTime}`;
    }
  }

  if (state) {
    mapped.state_abbr = state;
  }

  if (website) {
    mapped.external_url = website;
  }

  if (zip) {
    mapped.zip = zip;
  }

  return mapped;
};

export default formModel;
