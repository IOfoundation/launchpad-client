import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

import Business from './Business';

//const BusinessesList = ({businesses, handleClickOnBusiness, expanded}) => {
class BusinessesList extends Component {
  render() {
    const {handleClickOnBusiness, businesses} = this.props;
    return (
      <div>
        {businesses.map(business => {
          return (
            <Business
              business={business}
              key={business.id}
              handleClickOnBusiness={handleClickOnBusiness}
            />
          );
        })}
      </div>
    );
  }
}

BusinessesList.propTypes = {
  businesses: PropTypes.array.isRequired,
  expanded: PropTypes.bool,
  handleClickOnBusiness: PropTypes.func.isRequired,
};

export default BusinessesList;
