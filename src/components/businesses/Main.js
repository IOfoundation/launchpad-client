import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

import BusinessesList from './BusinessesList';
import Pagination from './Pagination';
import ResultInfo from './ResultInfo';
import ContentMap from '../layouts/ContentMap';

class Main extends Component {
  constructor(props) {
    super(props);
    this.reduceMap = this.reduceMap.bind(this);
    this.expandMap = this.expandMap.bind(this);
    this.onBoundsChange = this.onBoundsChange.bind(this);
    this.redoSearchInMap = this.redoSearchInMap.bind(this);
    this.state = {
      expanded: false,
      bounds: {},
    };
  }

  reduceMap() {
    this.setState({expanded: false});
  }

  expandMap() {
    this.setState({expanded: true});
  }

  onBoundsChange(mapDetails) {
    this.setState({bounds: mapDetails.bounds});
  }

  redoSearchInMap() {
    this.props.handleOnChangeFilterOptions(this.state.bounds, 'coordinates');
  }

  _renderResultsInfo() {
    if (this.props.filterOptions.businessTypes.length === 3) {
      return (
        <ResultInfo
          businessesMetadata={this.props.businessesMetadata}
          handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          filterOptions={this.props.filterOptions.businessTypes}
        />
      );
    }
    return null;
  }
  render() {
    const {
      businessesMetadata,
      organizations,
      organization,
      locations,
      handleClickOnClearAllFilters,
      handleChangePage,
    } = this.props;
    return (
      <ContentMap
        locations={locations}
        businessesMetadata={businessesMetadata}
        expanded={this.state.expanded}
        expandMap={this.expandMap}
        onBoundsChange={this.onBoundsChange}
        reduceMap={this.reduceMap}
        redoSearchInMap={this.redoSearchInMap}
        topBar={this._renderResultsInfo()}
      >
        <BusinessesList
          organizations={organizations}
          handleClickOnClearAllFilters={handleClickOnClearAllFilters}
        />
        <Pagination
          businessesMetadata={businessesMetadata}
          handleChangePage={handleChangePage}
        />
      </ContentMap>
    );
  }
}
Main.propTypes = {
  businessesMetadata: PropTypes.object.isRequired,
  filterOptions: PropTypes.object.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object),
};

export default Main;
