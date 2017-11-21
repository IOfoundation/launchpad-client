import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

import Business from './Business';

class BusinessesList extends PureComponent {
  _renderOrgs(organizations) {
    return this.props.organizations.map(organization => (
      <Business
        isSelected={this.props.selectedOrg === organization.id}
        business={organization}
        isMobile={this.props.isMobile}
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
  selectedOrg: PropTypes.number,
};

export default BusinessesList;
