import React from 'react';
import Section from './Section';
import {PropTypes} from 'prop-types';
import {formatAMPM, dayOfWeekAsInteger} from '../../../../utils';

const RegularSchedules = props => {
  const {schedules} = props;
  const $displayHoursOfOperations = schedules.map(schedule => {
    const opens = formatAMPM(new Date(schedule.opens_at));
    const closes = formatAMPM(new Date(schedule.closes_at));
    const day = dayOfWeekAsInteger(schedule.weekday);

    return (
      <p
        key={schedule.id}
      >{`${day}: Opens at ${opens}, Closes at ${closes}`}</p>
    );
  });

  return (
    $displayHoursOfOperations.length !== 0 && (
      <Section title="Hours of Operation">{$displayHoursOfOperations}</Section>
    )
  );
};

RegularSchedules.propTypes = {
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      weekday: PropTypes.number,
      opens_at: PropTypes.string,
      closes_at: PropTypes.string,
    })
  ),
};

export default RegularSchedules;
