import React from 'react';
import {PropTypes} from 'prop-types';
import FilterByText from './FilterByText';
import FilterByOptions from './FilterByOptions';

class FilterBox extends React.Component {
  render() {
    return (
      <div className="container-invert">
        <div className="grid">
          <FilterByText
            filterName={'Search Box'}
            handleTextSearchBusinesses={this.props.handleTextSearchBusinesses}
            handleOnRemoveFilterOption={this.props.handleOnRemoveFilterOption}
            handleClickOnClearAllFilters={
              this.props.handleClickOnClearAllFilters
            }
            getFilterChips={this.props.getFilterChips}
            search_results={this.props.search_results}
          />
        </div>
        <div className="grid container--middle bottom-xs between-xs p-left-0">
          <FilterByOptions
            filterName={'Business Services'}
            filterOptions={this.props.filterOptions.businessServices}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          />
          <FilterByOptions
            filterName={'Industry'}
            filterOptions={this.props.filterOptions.industries}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          />
          <FilterByOptions
            filterName={'Business Stage'}
            filterOptions={this.props.filterOptions.stages}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          />
          <FilterByOptions
            filterName={'Underserved Com...'}
            filterOptions={this.props.filterOptions.communities}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          />
        </div>
      </div>
    );
  }
}

FilterBox.propTypes = {
  filterOptions: PropTypes.object.isRequired,
  getFilterChips: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  handleOnRemoveFilterOption: PropTypes.func.isRequired,
  handleTextSearchBusinesses: PropTypes.func.isRequired,
  search_results: PropTypes.arrayOf(PropTypes.object),
};

export default FilterBox;
