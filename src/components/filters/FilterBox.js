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
        <div className="grid container--middle bottom-xs between-xs">
          <FilterByOptions
            filterName="Business Services"
            filterType={'industries'}
            filterOptions={this.props.filterOptions.industries}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          />
          <FilterByOptions
            filterName="Industry"
            filterType={'industries'}
            filterOptions={this.props.filterOptions.industries}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          />
          <FilterByOptions
            filterMultiple={true}
            filterName={'Busines Stage'}
            filterType={'stages'}
            filterOptions={this.props.filterOptions.stages}
            handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          />
          <FilterByOptions
            filterMultiple={true}
            filterName="Underserved Com..."
            filterType={'stages'}
            filterOptions={this.props.filterOptions.stages}
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
