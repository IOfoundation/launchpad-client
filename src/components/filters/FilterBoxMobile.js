import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import FilterByText from './mobile/FilterByText';
import FilterByOptions from './mobile/FilterByOptions';

class FilterBoxMobile extends PureComponent {
  render() {
    const {
      handleOnChangeFilterOptions,
      getTextSearchResults,
      handleClickOnClearAllFilters,
      businesses,
    } = this.props;
    const {filters, appliedFilters, items, organizations} = businesses;
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
  }
}
FilterBoxMobile.PropTypes = {
  businesses: PropTypes.object.isRequired,
  getTextSearchResults: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
};

export default FilterBoxMobile;
