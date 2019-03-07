export const timeZone = 'America/Los_Angeles';
export const locales = 'en-US';
export const getDate = str => {
  let date = new Date();

  if (str) {
    date = new Date(str);
  }

  const _toLocaleString = toLocaleString(date);
  const _getMonthByIndex = getMonthByIndex(_toLocaleString);

  return {
    day: _toLocaleString({
      day: '2-digit',
    }),
    month: _toLocaleString({
      month: 'short',
    }),
    monthLarge: _toLocaleString({
      month: 'long',
    }),
    dayNumber: _toLocaleString({
      day: 'numeric',
    }),
    year: _toLocaleString({
      year: 'numeric',
    }),
    nextThreeMonths: [
      _getMonthByIndex(date),
      _getMonthByIndex(1),
      _getMonthByIndex(2),
    ],
    time: _toLocaleString({
      hour: '2-digit',
      minute: '2-digit',
    }).replace(/\s/g, ''),
    fullDate: _toLocaleString({
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      month: 'long',
      timeZoneName: 'long',
      year: 'numeric',
    }),
    pacificTime: _toLocaleString({}),
  };
};

const toLocaleString = date => {
  return options => {
    return date.toLocaleString(locales, {timeZone, ...options});
  };
};

function getMonthByIndex(localDate) {
  return (index = 0) => {
    const year = localDate({
      year: 'numeric',
    });
    const month = localDate({
      month: 'numeric',
    });
    const nextDate = new Date(year, Number(month) + index, 0);

    return {
      name: nextDate.toLocaleString('en-US', {month: 'long'}),
      number: Number(month) + index,
    };
  };
}
