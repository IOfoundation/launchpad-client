import React from 'react';
import {PropTypes} from 'prop-types';
import {getDate} from '../../../../utils';

import Section from './Section';

export const DateSection = props => {
  const {start, end} = props;
  let contentElement = null;

  if (start) {
    const dateStart = getDate(start);
    const dateEnd = getDate(end);

    contentElement = (
      <Section>
        <span className="text-bold m-right-8">{`${dateStart.monthLarge} ${
          dateStart.day
        }, ${dateStart.year}`}</span>
        <span> {`${dateStart.time} - ${dateEnd.time}`}</span>
      </Section>
    );

    if (dateStart.dayNumber < dateEnd.dayNumber) {
      contentElement = (
        <Section>
          <span className="text-bold m-right-8">{`${dateStart.monthLarge} ${
            dateStart.day
          }, ${dateStart.year}`}</span>
          <span>{`${dateStart.time}`}</span>
          <span className="m-x-8">{'-'}</span>
          <span className="text-bold m-right-8">{`${dateEnd.monthLarge} ${
            dateEnd.day
          }, ${dateEnd.year}`}</span>
          <span>{`${dateEnd.time}`}</span>
        </Section>
      );
    }
  }

  return contentElement;
};

DateSection.propTypes = {
  date: PropTypes.string,
  end: PropTypes.string,
  start: PropTypes.string,
};

export default DateSection;
