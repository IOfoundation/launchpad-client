import React from 'react';
import {PropTypes} from 'prop-types';
import MetaInfoBusinesses from './MetaInfoBusinesses';

const ResultInfo = ({businessesMetadata}) => {
  return (
    <div className="businessList_top row between-xs">
      <span className="secondary bold bodyFont">{`${businessesMetadata.totalBusinesses} Resources Available`}</span>
      <MetaInfoBusinesses businessesMetadata={businessesMetadata} />
    </div>
  );
};

ResultInfo.propTypes = {
  businessesMetadata: PropTypes.object.isRequired,
};

export default ResultInfo;
