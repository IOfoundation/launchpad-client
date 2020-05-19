import {weekdays} from '@StaticData/data';

export const dayOfWeekAsInteger = day => {
  const select = weekdays.find(weekday => weekday.value === String(day));

  return select && select.name;
};
