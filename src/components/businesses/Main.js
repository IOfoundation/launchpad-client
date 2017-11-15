import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {isEmpty} from 'lodash';

import BusinessesList from './BusinessesList';
import Pagination from './Pagination';
import ResultInfo from './ResultInfo';
import ContentMap from '../layouts/ContentMap';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      bounds: {},
      selectedOrg: -1,
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
    if (this.props.displayOptions.locationToggleSwitch) {
      this.props.handleOnChangeFilterOptions(this.state.bounds, 'coordinates', false);
    }
  }

  highlightOrgCard(organizationId) {
    this.setState({selectedOrg: organizationId});
  }

  redoSearchInMap() {
    this.props.displayOptions.locationToggleSwitch
      ? this.props.handleOnChangeFilterOptions('', 'coordinates', true)
      : this.props.handleOnChangeFilterOptions(this.state.bounds, 'coordinates', false);
  }

  _renderResultsInfo() {
    const {
      businessesMetadata,
      handleOnChangeBusinessType,
      displayOptions,
      handleOnChangeFilterOptions,
      filterOptions,
    } = this.props;
    if (filterOptions.businessTypes.length === 3) {
      return (
        <ResultInfo
          businessesMetadata={businessesMetadata}
          checkBusinessType={handleOnChangeBusinessType}
          handleOnChangeFilterOptions={handleOnChangeFilterOptions}
          filterOptions={filterOptions.businessTypes}
          showBusinessTypes={displayOptions.showBusinessTypes}
        />
      );
    }
    return null;
  }

  _renderLoader() {
  return (
      <div className="load-div">
        <img className="loader" src="static-data/images/loader.gif"/>
        <h3 className="loader-text text-thin">Loading</h3>
      </div>
    );
  }

  _renderBusinesses() {
    return (
      <BusinessesList
        organizations={this.props.organizations}
        selectedOrg={this.state.selectedOrg}
        handleClickOnClearAllFilters={this.props.handleClickOnClearAllFilters}
      />
    );
  }
  render() {
    const {
      businessesMetadata,
      displayOptions,
      organizations,
      organization,
      locations,
      handleClickOnClearAllFilters,
      handleChangePage,
      isMobile
    } = this.props;
    return (
      <ContentMap
        locations={locations}
        isMobile={isMobile}
        organizations={organizations}
        businessesMetadata={businessesMetadata}
        expanded={this.state.expanded}
        expandMap={() => this.expandMap()}
        onBoundsChange={(mapDetails) => this.onBoundsChange(mapDetails)}
        reduceMap={() => this.reduceMap()}
        redoSearchInMap={() => this.redoSearchInMap()}
        topBar={this._renderResultsInfo()}
        toggleSwitch={displayOptions.locationToggleSwitch}
        highlightOrgCard={(organizationId) => this.highlightOrgCard(organizationId)}
      >
        {isEmpty(this.props.organizations) ? (
          this._renderLoader()
        ):(
          this._renderBusinesses()
        )}

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
  checkBusinessType: PropTypes.func.isRequired,
  checkLocationToggle: PropTypes.func.isRequired,
  displayOptions: PropTypes.object.isRequired,
  filterOptions: PropTypes.object.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object),
};

export default Main;
