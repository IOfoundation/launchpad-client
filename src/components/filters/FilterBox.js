import React from 'react';
import {PropTypes} from 'prop-types';
import FilterByText from './FilterByText';
import FilterByOptions from './FilterByOptions';

const FilterBox = ({
  getTextSearchResults,
  handleClickOnClearAllFilters,
  handleOnChangeFilterOptions,
  businesses: {appliedFilters, filters, items, organizations},
  filterById,
}) => {
  return (
    <div className="container-invert">
      <div className="grid">
        <FilterByText
          filterName={'Search Box'}
          getTextSearchResults={getTextSearchResults}
          handleClickOnClearAllFilters={handleClickOnClearAllFilters}
          handleOnChangeFilterOptions={handleOnChangeFilterOptions}
          filterById={filterById}
          appliedFilters={appliedFilters}
          organizations={organizations}
          items={items}
        />
      </div>
      <div className="grid col-lg-10 col-md-12 col-xs-12 bottom-xs between-xs p-left-0">
        <FilterByOptions
          filterName={'Business Services'}
          filterOptions={filters.businessServices}
          handleOnChangeFilterOptions={handleOnChangeFilterOptions}
        />
        <FilterByOptions
          filterName={'Industry'}
          filterOptions={filters.industries}
          handleOnChangeFilterOptions={handleOnChangeFilterOptions}
        />
        <FilterByOptions
          filterName={'Business Stage'}
          filterOptions={filters.stages}
          handleOnChangeFilterOptions={handleOnChangeFilterOptions}
        />
        <FilterByOptions
          filterName={'Underserved Com...'}
          filterOptions={filters.communities}
          handleOnChangeFilterOptions={handleOnChangeFilterOptions}
        />
      </div>
    </div>
  );
};

FilterBox.propTypes = {
  businesses: PropTypes.object.isRequired,
  filterById: PropTypes.bool,
  getTextSearchResults: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
};

export default FilterBox;
