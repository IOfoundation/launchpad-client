import React from 'react';
import {PropTypes} from 'prop-types';
import FilterByText from './FilterByText';
import FilterByOptions from './FilterByOptions';

class FilterBox extends React.Component {
  render() {
    return (
      <div className="container-invert">
        <div className="grid">
          <FilterByText
            filterName=""
            handleTextSearchBusinesses={this.props.handleTextSearchBusinesses}
          />
        </div>
        <div className="grid container--middle bottom-xs between-xs p-left-0">
          <FilterByOptions
            filterName={'Business Services'}
            filterOptions={this.props.filterOptions.businessServices}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          />
          <FilterByOptions
            filterName="Industry"
            filterOptions={this.props.filterOptions.industries}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          />
          <FilterByOptions
            filterMultiple={true}
            filterName={'Business Stage'}
            filterOptions={this.props.filterOptions.stages}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          />
          <FilterByOptions
            filterMultiple={true}
            filterName="Underserved Com..."
            filterOptions={this.props.filterOptions.communities}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          />
        </div>
      </div>
    );
  }
}

FilterBox.propTypes = {
  filterOptions: PropTypes.object.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  handleTextSearchBusinesses: PropTypes.func.isRequired,
};

export default FilterBox;
