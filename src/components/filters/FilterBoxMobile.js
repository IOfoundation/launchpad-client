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
    // override marginTop as nothing is above this element on mobile
    // and it produces an ugly white strip between the header and filter
    <div className="container-invert" style={{marginTop: 0}}>
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
