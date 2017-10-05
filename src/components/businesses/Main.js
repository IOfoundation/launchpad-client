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
    return <ResultInfo
      businessesMetadata={this.props.businessesMetadata}
      handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
      filterOptions={this.props.filterOptions.businessTypes}
    />;
  }
  render() {
    const {
      businessesMetadata,
      locations,
      organizations,
      handleClickOnBusiness,
      handleClickOnClearAllFilters,
      handleChangePage,
    } = this.props;
    return (
      <ContentMap
        locations={locations}
        organizations={organizations}
        businessesMetadata={businessesMetadata}
        expanded={this.state.expanded}
        expandMap={this.expandMap}
        reduceMap={this.reduceMap}
        topBar={this._renderResultsInfo()}
      >
        <BusinessesList
          locations={locations}
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
  filterOptions: PropTypes.array.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleClickOnBusiness: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  organizations: PropTypes.array.isRequired,
};

export default Main;
