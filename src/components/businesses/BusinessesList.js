import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

import Business from './Business';

class BusinessesList extends Component {
  _renderOrgs(organizations) {
    return this.props.organizations.map(organization => (
      <Business
        business={organization}
        key={organization.id}
        expanded={organizations.length === 1}
      />
    ));
  }
  render() {
    const {handleClickOnClearAllFilters, organizations} = this.props;
    return <div>{this._renderOrgs(organizations)}</div>;
  }
}

BusinessesList.propTypes = {
  handleClickOnClearAllFilters: PropTypes.func,
  organizations: PropTypes.arrayOf(PropTypes.object),
};

export default BusinessesList;
