import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {MdClear} from 'react-icons/lib/md';

import Business from './Business';

//const BusinessesList = ({businesses, handleClickOnBusiness, expanded}) => {
class BusinessesList extends Component {
  render() {
    const {handleClickOnBusiness, handleClickOnClearFilters, organizations} = this.props;
    return (
      <div>
        {organizations.map(organization => {
          return (
            <Business
              business={organization}
              key={organization.id}
              handleClickOnBusiness={handleClickOnBusiness}
            />
          );
        })}
        <button
          className="btn-link btn-link-primary"
          onClick={handleClickOnClearFilters}
          >
            Clear Search Result
          <MdClear
            size={30}
            color={'#2AD587'}/>
        </button>
      </div>
    );
  }
}

BusinessesList.propTypes = {
  locations: PropTypes.array.isRequired,
  organizations: PropTypes.array.isRequired,
  expanded: PropTypes.bool,
  handleClickOnBusiness: PropTypes.func.isRequired,
  handleClickOnClearFilters: PropTypes.func,
};

export default BusinessesList;
