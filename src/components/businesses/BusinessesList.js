import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {MdClear} from 'react-icons/lib/md';

import Business from './Business';

class BusinessesList extends Component {
  _renderOrgs(organizations) {
    console.log('organizations', this.props.organizations);
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

    return (
      <div>
        {this._renderOrgs(organizations)}
        <button
          className={
            organizations.length <= 0
            ? 'btn-link btn-link-primary hide'
            : 'btn-link btn-link-primary btn-clear m-bot-24 show'
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
