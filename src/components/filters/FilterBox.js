import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import FilterByText from './FilterByText';
import FilterByOptions from './FilterByOptions';

class FilterBox extends PureComponent {
  render() {
    const {appliedFilters, filters, items} = this.props.businesses;
    return (
      <div className="container-invert">
        <div className="grid">
          <FilterByText
            filterName={'Search Box'}
            getTextSearchResults={this.props.getTextSearchResults}
            handleClickOnClearAllFilters={
              this.props.handleClickOnClearAllFilters
            }
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
            appliedFilters={appliedFilters}
            items={items}
          />
        </div>
        <div className="grid col-lg-10 col-md-12 col-xs-12 bottom-xs between-xs p-left-0">
          <FilterByOptions
            filterName={'Business Services'}
            filterOptions={filters.businessServices}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          />
          <FilterByOptions
            filterName={'Industry'}
            filterOptions={filters.industries}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          />
          <FilterByOptions
            filterName={'Business Stage'}
            filterOptions={filters.stages}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          />
          <FilterByOptions
            filterName={'Underserved Com...'}
            filterOptions={filters.communities}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          />
        </div>
      </div>
    );
  }
}

FilterBox.propTypes = {
  businesses: PropTypes.object.isRequired,
  getTextSearchResults: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
};

export default FilterBox;
