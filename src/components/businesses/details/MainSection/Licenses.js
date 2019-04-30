import React from 'react';
import {PropTypes} from 'prop-types';

import Detail from '../Detail';

const Licenses = props => {
  const {licenses} = props;

  if (licenses && licenses.length > 0) {
    const content = licenses.length > 0 ? licenses.join(', ') : licenses[0];

    return <Detail title="Licenses" content={content} />;
  }

  return null;
};

Licenses.propTypes = {
  licenses: PropTypes.arrayOf(PropTypes.string),
};

export default Licenses;
