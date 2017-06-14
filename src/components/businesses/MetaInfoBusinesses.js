import React from 'react';
import {PropTypes} from 'prop-types';

class MetaInfoBusinesses extends React.Component {
  resourcesStartOn() {
    const _businessesMetadata = this.props.businessesMetadata;
    return (
      (_businessesMetadata.pagination.currentPage - 1) *
        _businessesMetadata.pagination.perPage +
      1
    );
  }

  resourcesEndOn() {
    const _businessesMetadata = this.props.businessesMetadata;
    let resourcesEndOn =
      _businessesMetadata.pagination.currentPage *
      _businessesMetadata.pagination.perPage;
    const totalResources = _businessesMetadata.totalBusinesses;
    if (totalResources < resourcesEndOn) {
      resourcesEndOn = totalResources;
    }
    return resourcesEndOn;
  }

  render() {
    return (
      <span className="secondary bodyFont">{`Showing Results ${this.resourcesStartOn()}-${this.resourcesEndOn()}`}</span>
    );
  }
}

MetaInfoBusinesses.propTypes = {
  businessesMetadata: PropTypes.object.isRequired,
};

export default MetaInfoBusinesses;
