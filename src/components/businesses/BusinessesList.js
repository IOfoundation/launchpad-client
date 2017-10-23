import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {MdClear} from 'react-icons/lib/md';

import Business from './Business';

class BusinessesList extends Component {

  _renderOrgs(organizations) {
    return this.props.organizations.map(organization => (
      <Business
        business={organization}
        key={organization.id}
        expanded={organizations.length === 1 ? (true) : (false)}
      />
    ));
  }
  render() {
    const {
      handleClickOnClearAllFilters,
      organizations,
    } = this.props;

    return (
      <div>
        {this._renderOrgs(this.props.organizations)}
        <button
          className={
            this.props.organizations.length <= 0
            ? 'btn-link btn-link-primary hide'
            : 'btn-link btn-link-primary show'
          }
          onClick={handleClickOnClearAllFilters}
        >
          {'Clear Search Result'}
          <MdClear size={30} color={'#2AD587'} />
        </button>
      </div>
    );
  }
}

BusinessesList.propTypes = {
  handleClickOnClearAllFilters: PropTypes.func,
  organizations: PropTypes.arrayOf(PropTypes.object),
};

export default BusinessesList;
