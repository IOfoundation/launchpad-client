import React from 'react';
import {PropTypes} from 'prop-types';
import FilterByText from './FilterByText';
import FilterByOptions from './FilterByOptions';

const FilterBox = ({handleTextSearchBusinesses}) => {
  return (
    <div>
      <FilterByText handleTextSearchBusinesses={handleTextSearchBusinesses}/>
      <FilterByOptions filterType="Assistance Needed" />
      <FilterByOptions filterType="Industry" />
      <FilterByOptions filterType="Business Stage" />
      <FilterByOptions filterType="Business Type" />
      <FilterByOptions filterType="Comunities" />
    </div>
  );
};

FilterBox.PropTypes = {
  handleTextSearchBusinesses: PropTypes.func.isRequired,
}

export default FilterBox;
