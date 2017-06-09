import React from 'react';
import {PropTypes} from 'prop-types';

class MetaInfoBusinesses extends React.Component {
  totalResources(businessesMetadata) {
    return businessesMetadata.totalBusinesses;
  }

  resourcesStartOn(businessesMetadata) {
    return (
      (businessesMetadata.pagination.currentPage - 1) *
        businessesMetadata.pagination.perPage +
      1
    );
  }

  resourcesEndOn(businessesMetadata) {
    let resourcesEndOn =
      businessesMetadata.pagination.currentPage *
      businessesMetadata.pagination.perPage;
    const totalResources = businessesMetadata.totalBusinesses;
    if (totalResources < resourcesEndOn) {
      resourcesEndOn = totalResources;
    }
    return resourcesEndOn;
  }

  render() {
    return (
      <span
      >{`Showing Results ${this.resourcesStartOn(this.props.businessesMetadata)}-${this.resourcesEndOn(this.props.businessesMetadata)}`}</span>
    );
  }
}

MetaInfoBusinesses.PropTypes = {
  businessesMetadata: PropTypes.object.isRequired,
};

export default MetaInfoBusinesses;
