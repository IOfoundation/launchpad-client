export function timeToTwelveHourFormat(time) {
  const timeArray = time.split(':');
  let ampm = 'AM';

  if (timeArray[0] >= 12) {
    ampm = 'PM';
  }

  if (timeArray[0] > 12) {
    timeArray[0] = timeArray[0] - 12;
  }

  return `${timeArray[0]}:${timeArray[1]}${ampm}`;
}
