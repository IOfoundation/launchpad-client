import {falsyToString} from '@Utils';

const parseDate = hour => {
  const date = hour.split('T');

  return {
    date: date ? date[0] : '',
    time: date ? date[1].split('.')[0] : '',
  };
};

const initialValues = ({
  body,
  city,
  ending_at,
  external_url,
  is_all_day,
  starting_at,
  state_abbr,
  street_1,
  street_2,
  title,
  zip,
}) => {
  const mapped = {};
  const start = parseDate(starting_at);
  const end = parseDate(ending_at);

  mapped.city = falsyToString(city);
  mapped.title = falsyToString(title);
  mapped.website = falsyToString(external_url);
  mapped.description = falsyToString(body);
  mapped.address = falsyToString(street_1);
  mapped.address2 = falsyToString(street_2);
  mapped.state = falsyToString(state_abbr);
  mapped.zip = falsyToString(zip);
  mapped.startDate = start.date;
  mapped.startTime = start.time;
  mapped.endDate = end.date;
  mapped.endTime = end.time;
  mapped.allDay = Boolean(is_all_day);

  return mapped;
};

export default initialValues;
