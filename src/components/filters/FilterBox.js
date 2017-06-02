import React from 'react';

import FilterByText from './FilterByText';
import FilterByOptions from './FilterByOptions';

const FilterBox = () => {
  return (
    <div>
      <FilterByText />
      <FilterByOptions filterType="Assistance Needed"/>
      <FilterByOptions filterType="Industry" />
      <FilterByOptions filterType="Business Stage" />
      <FilterByOptions filterType="Business Type" />
      <FilterByOptions filterType="Comunities" />
    </div>
  )
};

export default FilterBox;
