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
            getTextSearchResults={this.props.getTextSearchResults}
            handleOnRemoveFilterOption={this.props.handleOnRemoveFilterOption}
            handleClickOnClearAllFilters={
              this.props.handleClickOnClearAllFilters
            }
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
            getFilterChips={this.props.getFilterChips}
            getBusiness={this.props.getBusiness}
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
  getBusiness: PropTypes.func.isRequired,
  getFilterChips: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  handleOnRemoveFilterOption: PropTypes.func.isRequired,
  getTextSearchResults: PropTypes.func.isRequired,
  search_results: PropTypes.arrayOf(PropTypes.object),
};

export default FilterBox;
