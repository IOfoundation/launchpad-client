import React from 'react';
import {PropTypes} from 'prop-types';
import FilterOption from './FilterOption';
import ArrowRight from '../../shared/ArrowRight';

const FilterByOptions = ({filterOptions, handleOnChangeFilterOptions}) => {
  return (
    <div className="dropdown-input-container">
      <span className="filter-icon">
        <img src="../static-data/images/filter.png" />
        {'Filters'}
      </span>
      <input className="dropdown-input" id="filters-dropdown" type="checkbox" />
      <label className="dropdown-label" htmlFor="filters-dropdown">
        {'No filters selected'}
      </label>
      <ArrowRight
        className="right-arrow"
        size={20}
        style={{color: '#fff', verticalAlign: 'middle'}}
        htmlFor="filters-dropdown"
      />
      <label htmlFor="filters-dropdown" className="close-icon">
        <img src="/static-data/images/close.png" />
      </label>
      <div className="dropdown-container-filters">
        <FilterOption
          filterName={'Business Services'}
          filterOptions={filterOptions.businessServices}
          handleOnChangeFilterOptions={handleOnChangeFilterOptions}
        />
        <FilterOption
          filterName={'Industry'}
          filterOptions={filterOptions.industries}
          handleOnChangeFilterOptions={handleOnChangeFilterOptions}
        />
        <FilterOption
          filterName={'Business Stage'}
          filterOptions={filterOptions.stages}
          handleOnChangeFilterOptions={handleOnChangeFilterOptions}
        />
        <FilterOption
          filterName={'Underserved Com...'}
          filterOptions={filterOptions.communities}
          handleOnChangeFilterOptions={handleOnChangeFilterOptions}
        />
      </div>
    </div>
  );
};
FilterByOptions.propTypes = {
  filterOptions: PropTypes.shape({
    businessServices: PropTypes.arrayOf(PropTypes.object),
  }),
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
};

export default FilterByOptions;
