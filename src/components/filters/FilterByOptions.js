import React from 'react';
import {PropTypes} from 'prop-types';

const FilterByOptions = ({filterType}) => {
  return (
    <select name="">
      <option value="">{filterType}</option>
      <option value="1">Option1</option>
    </select>
  );
};

FilterByOptions.propTypes = {
  filterType: PropTypes.string,
};

export default FilterByOptions;
