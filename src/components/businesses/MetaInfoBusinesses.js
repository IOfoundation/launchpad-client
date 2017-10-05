import React from 'react';
import {PropTypes} from 'prop-types';

class MetaInfoBusinesses extends React.Component {
  resourcesStartOn() {
    const _businessesMetadata = this.props.businessesMetadata;
    return (
      (_businessesMetadata.pagination.currentPage - 1) *
      (_businessesMetadata.pagination.per_page + 1)
    );
  }

  resourcesEndOn() {
    const _businessesMetadata = this.props.businessesMetadata;
    let resourcesEndOn =
      _businessesMetadata.pagination.currentPage *
      _businessesMetadata.pagination.per_page;
    const totalResources = _businessesMetadata.totalOrganizations;
    if (totalResources < resourcesEndOn) {
      resourcesEndOn = totalResources;
    }
    return resourcesEndOn;
  }

  render() {
    return (
      <span className="secondary">{`Showing Results ${this.resourcesStartOn()}-${this.resourcesEndOn()}`}</span>
    );
  }
}

MetaInfoBusinesses.propTypes = {
  businessesMetadata: PropTypes.object.isRequired,
};

export default MetaInfoBusinesses;
