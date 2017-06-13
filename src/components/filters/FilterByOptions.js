import React from 'react';
import {PropTypes} from 'prop-types';

class FilterByOptions extends React.Component {
  render() {
    return (
      <select
        name={this.props.filterType}
        onChange={this.props.handleOnChangeFilterOptions}
      >
        <option value="">{this.props.filterName}</option>
        {this.props.filterOptions.map(filterOption => (
          <option key={filterOption.id} value={filterOption.id}>
            {filterOption.name}
          </option>
        ))}
      </select>
    );
  }
}

FilterByOptions.propTypes = {
  filterName: PropTypes.string.isRequired,
  filterOptions: PropTypes.array.isRequired,
  filterType: PropTypes.string.isRequired,
  handleOnChangeFilterOptions: PropTypes.func,
};

export default FilterByOptions;
