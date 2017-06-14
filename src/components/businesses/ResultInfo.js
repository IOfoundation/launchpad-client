import React from 'react';
import {PropTypes} from 'prop-types';
import MetaInfoBusinesses from './MetaInfoBusinesses';

const ResultInfo = ({businessesMetadata}) => {
  return (
    <div className="businessList_top ">
      <div className="row between-xs middle-xs businessList_top_content">
        <span className="secondary bold bodyFont">{`${businessesMetadata.totalBusinesses} Resources Available`}</span>
        <MetaInfoBusinesses businessesMetadata={businessesMetadata} />
      </div>
    </div>
  );
};

ResultInfo.propTypes = {
  businessesMetadata: PropTypes.object.isRequired,
};

export default ResultInfo;
