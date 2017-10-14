import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {MdClear} from 'react-icons/lib/md';

import Business from './Business';

//const BusinessesList = ({businesses, handleClickOnBusiness, expanded}) => {
class BusinessesList extends Component {

  _renderOrgs(organizations, organization) {
    if (this.props.organization.id != null) {
      return (
        <Business
          business={organization}
          key={organization.id}
          handleClickOnBusiness={this.props.handleClickOnBusiness}
          expanded={true}
        />
      );
    } else {
      return this.props.organizations.map(organization => (
        <Business
          business={organization}
          key={organization.id}
          handleClickOnBusiness={this.props.handleClickOnBusiness}
          expanded={false}
        />
      ));
    }
  }
  render() {
    const {
      handleClickOnBusiness,
      handleClickOnClearAllFilters,
      organizations,
      organization,
    } = this.props;

    return (
      <div>
        {this._renderOrgs(this.props.organizations, this.props.organization)}
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
  expanded: PropTypes.bool,
  handleClickOnBusiness: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func,
  organizations: PropTypes.arrayOf(PropTypes.object),
  organization: PropTypes.object,
};

export default BusinessesList;
