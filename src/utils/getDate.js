export const getDate = str => {
  let date;

  if (str) {
    date = new Date(str);
  } else {
    date = new Date();
  }

  return {
    day: String(date.getDate()),
    month: date.toLocaleDateString('en-us', {month: 'short'}),
    monthLarge: date.toLocaleDateString('en-us', {month: 'long'}),
    year: date.getFullYear(),
    nextThreeMonths: [
      getMonthByIndex(date, 1),
      getMonthByIndex(date, 2),
      getMonthByIndex(date, 3),
    ],
  };
};

function getMonthByIndex(date, index = 1) {
  const nextDate = new Date(date.getFullYear(), date.getMonth() + index, 0);

  return {
    name: nextDate.toLocaleDateString('en-us', {month: 'long'}),
    number: nextDate.getMonth() + 1,
  };
}
