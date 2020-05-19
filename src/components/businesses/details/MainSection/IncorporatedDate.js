import React from 'react';
import {PropTypes} from 'prop-types';

import Detail from '../Detail';
import {getDate} from '@Utils';

const IncorporatedDate = props => {
  const {incorporatedDate} = props;

  if (incorporatedDate) {
    const date = getDate(incorporatedDate);

    return (
      <Detail
        title="Date of Incorporation"
        content={`${date.monthLarge} ${date.dayNumber}, ${date.year}`}
      />
    );
  }

  return null;
};

IncorporatedDate.propTypes = {
  incorporatedDate: PropTypes.string,
};

export default IncorporatedDate;
