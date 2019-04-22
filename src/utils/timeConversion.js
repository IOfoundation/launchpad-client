export function timeConversion(s) {
  const timeRegex = /([0-9]{1,2}):([0-9]{2})(AM|PM)/gm;
  const time = timeRegex.exec(s);

  function isPm(id) {
    return id === 'PM';
  }

  function isTwelve(hour) {
    return hour === '12';
  }

  function transform24Hour(_time) {
    return Number(_time) + 12;
  }

  if (isPm(time[3]) && !isTwelve(time[1])) {
    time[1] = transform24Hour(time[1]);
  } else if (!isPm(time[3]) && isTwelve(time[1])) {
    time[1] = '0';
  }

  if (time[1] < 10) {
    time[1] = `0${time[1]}`;
  }

  if (time[2] < 10 && time[2] > 0) {
    time[2] = `0${time[2]}`;
  }

  return `${time[1]}:${time[2]}`;
}
