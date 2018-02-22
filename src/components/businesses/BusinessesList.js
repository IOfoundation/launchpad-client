import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

import Business from './Business';

class BusinessesList extends PureComponent {
  _renderOrgs(organizations) {
    const {isMobile, selectedOrg, totalOrganizations} = this.props;
    return organizations.map(organization => (
      <Business
        isSelected={selectedOrg === organization.id}
        business={organization}
        isMobile={isMobile}
        key={organization.id}
        expanded={totalOrganizations <= 1}
      />
    ));
  }
  render() {
    const {organizations} = this.props;
    return organizations && <div>{this._renderOrgs(organizations)}</div>;
  }
}

BusinessesList.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object),
  selectedOrg: PropTypes.number.isRequired,
  totalOrganizations: PropTypes.number.isRequired,
};

export default BusinessesList;
