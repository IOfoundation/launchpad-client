import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import FilterByText from './mobile/FilterByText';
import FilterByOptions from './mobile/FilterByOptions';

class FilterBoxMobile extends Component {
  render() {
    return (
      <div className="container-invert">
        <FilterByOptions
          filterOptions={this.props.filterOptions}
          handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
        />
        <FilterByText
          filterName={'Search Box'}
          getTextSearchResults={this.props.getTextSearchResults}
          handleClickOnClearAllFilters={this.props.handleClickOnClearAllFilters}
          handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          appliedFilters={this.props.appliedFilters}
          getBusiness={this.props.getBusiness}
          items={this.props.items}
          filterById={this.props.filterById}
          organization={this.props.organization}
        />
      </div>
    )
  }
}
FilterBoxMobile.PropTypes = {
  appliedFilters: PropTypes.object,
  getBusiness: PropTypes.func.isRequired,
  getTextSearchResults: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
};

export default FilterBoxMobile;
