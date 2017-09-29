import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

import Business from './Business';

//const BusinessesList = ({businesses, handleClickOnBusiness, expanded}) => {
class BusinessesList extends Component {
  render() {
    const {handleClickOnBusiness, organizations} = this.props;
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
      </div>
    );
  }
}

BusinessesList.propTypes = {
  locations: PropTypes.array.isRequired,
  organizations: PropTypes.array.isRequired,
  expanded: PropTypes.bool,
  handleClickOnBusiness: PropTypes.func.isRequired,
};

export default BusinessesList;
