import React from 'react';
import {PropTypes} from 'prop-types';

import Detail from '../Detail';

const Accreditations = props => {
  const {accreditations} = props;

  if (accreditations && accreditations.length > 0) {
    const content =
      accreditations.length > 0 ? accreditations.join(', ') : accreditations[0];

    return <Detail title="Accreditations" content={content} />;
  }

  return null;
};

Accreditations.propTypes = {
  accreditations: PropTypes.arrayOf(PropTypes.string),
};

export default Accreditations;
