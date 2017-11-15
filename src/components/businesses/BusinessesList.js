import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

import Business from './Business';

class BusinessesList extends PureComponent {
  _renderOrgs(organizations) {
    console.log(this.props.selectedOrg)
    return this.props.organizations.map(organization => (
      <Business
        selectedColor={this.props.selectedOrg === String(organization.id)? '#E5E5E5' : '#F2F2F2'}
        business={organization}
        key={organization.id}
        expanded={organizations.length === 1}
      />
    ));
  }
  render() {
    const {handleClickOnClearAllFilters, organizations} = this.props;
    return organizations && <div>{this._renderOrgs(organizations)}</div>;
  }
}

BusinessesList.propTypes = {
  handleClickOnClearAllFilters: PropTypes.func,
  organizations: PropTypes.arrayOf(PropTypes.object),
  selectedOrg: PropTypes.string,
};

export default BusinessesList;
