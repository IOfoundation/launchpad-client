import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

import Business from './Business';

class BusinessesList extends PureComponent {
  _renderOrgs(organizations) {
    const {isMobile, selectedOrg} = this.props;
    return organizations.map(organization => (
      <Business
        isSelected={selectedOrg === organization.id}
        business={organization}
        isMobile={isMobile}
        key={organization.id}
        expanded={organizations.length === 1}
      />
    ));
  }
  render() {
    const {organizations} = this.props;
    return organizations && <div>{this._renderOrgs(organizations)}</div>;
  }
}

BusinessesList.propTypes = {
  organizations: PropTypes.arrayOf(PropTypes.object),
  isMobile: PropTypes.bool,
  selectedOrg: PropTypes.number,
};

export default BusinessesList;
