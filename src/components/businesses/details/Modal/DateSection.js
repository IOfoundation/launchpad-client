import React from 'react';
import {PropTypes} from 'prop-types';
import {getDateFromString} from '../../../../utils/getDateFromString';

import Section from './Section';

export const DateSection = props => {
  const {date} = props;
  let $content = null;

  if (date) {
    const dateInformation = getDateFromString(date);
    $content = (
      <Section>
        <span className="text-bold">{`${dateInformation.monthLarge} ${
          dateInformation.day
        }, ${dateInformation.year}`}</span>
      </Section>
    );
  }

  return $content;
};

DateSection.propTypes = {
  date: PropTypes.string,
};

export default DateSection;
