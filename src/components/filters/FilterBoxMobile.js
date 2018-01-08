import React from 'react';
import {PropTypes} from 'prop-types';
import FilterByText from './mobile/FilterByText';
import FilterByOptions from './mobile/FilterByOptions';

const FilterBoxMobile = ({
  getTextSearchResults,
  handleClickOnClearAllFilters,
  handleOnChangeFilterOptions,
  businesses: {appliedFilters, filters, items, organizations},
}) => {
  return (
    <div className="container-invert">
      <FilterByOptions
        filterOptions={filters}
        handleOnChangeFilterOptions={handleOnChangeFilterOptions}
      />
      <FilterByText
        filterName={'Search Box'}
        getTextSearchResults={getTextSearchResults}
        handleClickOnClearAllFilters={handleClickOnClearAllFilters}
        handleOnChangeFilterOptions={handleOnChangeFilterOptions}
        appliedFilters={appliedFilters}
        organizations={organizations}
        items={items}
      />
    </div>
  );
};
FilterBoxMobile.propTypes = {
  businesses: PropTypes.shape({
    organizations: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  getTextSearchResults: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
};

export default FilterBoxMobile;
