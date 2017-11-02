import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {MdClear} from 'react-icons/lib/md';
import RightArrow from 'react-icons/lib/fa/angle-right';
import FilterOption from './FilterOption';

class FilterByOptions extends Component {
  render() {
    const {filterOptions} = this.props;
    return (
      <div className="dropdown-input-container">
        <span className="filter-icon">
          <img src="../static-data/images/filter.png" />
          {'Filters'}
        </span>
        <input
          className="dropdown-input"
          id="filters-dropdown"
          type="checkbox"
        />
        <label className="dropdown-label" htmlFor="filters-dropdown">
          {'No filters selected'}
        </label>
        <RightArrow
          className="right-arrow"
          htmlFor="filters-dropdown"
          size={20}
        />
        <label htmlFor="filters-dropdown" className="close-icon">
          <MdClear size={24} color="#2AD587" />
        </label>
        <div className="dropdown-container-filters">
          <FilterOption
            filterName={'Business Services'}
            filterOptions={filterOptions.businessServices}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions} />
          <FilterOption
            filterName={'Industry'}
            filterOptions={filterOptions.industries}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions} />
          <FilterOption
            filterName={'Business Stage'}
            filterOptions={filterOptions.stages}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          />
          <FilterOption
            filterName={'Underserved Com...'}
            filterOptions={filterOptions.communities}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          />
        </div>
      </div>
    );
  }
}
FilterByOptions.propTypes = {
  filterOptions: PropTypes.object.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
};

export default FilterByOptions;
