import React from 'react';
import {PropTypes} from 'prop-types';

import Detail from '../Detail';

const LegalStatus = props => {
  const {legalStatus} = props;

  if (legalStatus) {
    return <Detail title="Legal Status" content={legalStatus} />;
  }

  return null;
};

LegalStatus.propTypes = {
  legalStatus: PropTypes.string,
};

export default LegalStatus;
