export const getDateFromString = str => {
  const date = new Date(str);

  return {
    day: String(date.getDate()),
    month: date.toLocaleString('en-us', {month: 'short'}),
  };
};
