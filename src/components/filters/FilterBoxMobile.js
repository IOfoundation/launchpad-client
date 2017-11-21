import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import FilterByText from './mobile/FilterByText';
import FilterByOptions from './mobile/FilterByOptions';

class FilterBoxMobile extends PureComponent {
  render() {
    const {filterOptions, appliedFilters, items} = this.props.businesses;
    return (
      <div className="container-invert">
        <FilterByOptions
          filterOptions={filterOptions}
          handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
        />
        <FilterByText
          filterName={'Search Box'}
          getTextSearchResults={this.props.getTextSearchResults}
          handleClickOnClearAllFilters={this.props.handleClickOnClearAllFilters}
          handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          appliedFilters={appliedFilters}
          getBusiness={this.props.getBusiness}
          items={items}
        />
      </div>
    );
  }
}
FilterBoxMobile.PropTypes = {
  businesses: PropTypes.object.isRequired,
  getBusiness: PropTypes.func.isRequired,
  getTextSearchResults: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
};

export default FilterBoxMobile;
