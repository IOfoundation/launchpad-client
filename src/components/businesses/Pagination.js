import React from 'react';
import {PropTypes} from 'prop-types';
import MetaInfoBusinesses from './MetaInfoBusinesses';

const Pagination = ({businessesMetadata}) => {
  return (
    <div>
      <MetaInfoBusinesses businessesMetadata={businessesMetadata} />
    </div>
  );
};

Pagination.PropTypes = {
  businessesMetadata: PropTypes.object.isRequired,
};

export default Pagination;
