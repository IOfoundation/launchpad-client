import React from 'react';
import {PropTypes} from 'prop-types';
import MetaInfoBusinesses from './MetaInfoBusinesses';

const ResultInfo = ({businessesMetadata}) => {
  return (
    <div>
      <span>{`${businessesMetadata.totalBusinesses} Resources Available`}</span>
      <MetaInfoBusinesses businessesMetadata={businessesMetadata} />
    </div>
  );
};

ResultInfo.propTypes = {
  businessesMetadata: PropTypes.object.isRequired,
};

export default ResultInfo;
