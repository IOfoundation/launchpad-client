import React from 'react';
import {PropTypes} from 'prop-types';
import {MdClear} from 'react-icons/lib/md';

import Business from './Business';

//const BusinessesList = ({businesses, handleClickOnBusiness, expanded}) => {
class BusinessesList extends React.Component {
  render() {
    const {
      handleClickOnBusiness,
      handleClickOnClearAllFilters,
      organizations,
    } = this.props;
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
  organizations: PropTypes.array.isRequired,
};

export default BusinessesList;
