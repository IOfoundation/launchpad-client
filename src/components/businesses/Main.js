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
    this.state = {
      expanded: false,
    };
  }

  reduceMap() {
    this.setState({expanded: false});
  }

  expandMap() {
    this.setState({expanded: true});
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
      locations,
      handleClickOnBusiness,
      handleClickOnClearAllFilters,
      handleChangePage,
    } = this.props;
    return (
      <ContentMap
        locations={locations}
        businessesMetadata={businessesMetadata}
        expanded={this.state.expanded}
        expandMap={this.expandMap}
        reduceMap={this.reduceMap}
        topBar={this._renderResultsInfo()}
      >
        <BusinessesList
          organizations={organizations}
          handleClickOnBusiness={handleClickOnBusiness}
          handleClickOnClearAllFilters={handleClickOnClearAllFilters}
          expanded={this.state.cardExpanded}
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
  handleClickOnBusiness: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  organizations: PropTypes.array.isRequired,
};

export default Main;
