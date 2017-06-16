import React from 'react';
import {PropTypes} from 'prop-types';
import FilterByText from './FilterByText';
import FilterByOptions from './FilterByOptions';

class FilterBox extends React.Component {
  render() {
    return (
      <div className="row bottom-xs between-xs">
        <FilterByText
          handleTextSearchBusinesses={this.props.handleTextSearchBusinesses}
        />
        <FilterByOptions
          filterName="Assistance Needed"
          filterType={''}
          filterOptions={[]}
        />
        <FilterByOptions
          filterName="Industry"
          filterType={'industries'}
          filterOptions={this.props.filterOptions.industries}
          handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
        />
        <FilterByOptions
          filterName="Business Stage"
          filterType={'stages'}
          filterOptions={this.props.filterOptions.stages}
          handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
        />
        <FilterByOptions
          filterName="Business Type"
          filterType={'businessTypes'}
          filterOptions={this.props.filterOptions.businessTypes}
          handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
        />
        <FilterByOptions
          filterName="Communities"
          filterType={'communities'}
          filterOptions={this.props.filterOptions.communities}
          handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
        />

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
