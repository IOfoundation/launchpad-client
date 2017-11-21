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
    if (this.props.businesses.displayOptions.locationToggleSwitch) {
      this.props.handleOnChangeFilterOptions(
        'coordinates',
        this.state.bounds,
        false
      );
    }
  }

  highlightOrgCard(organizationId) {
    this.setState({selectedOrg: organizationId});
  }

  redoSearchInMap() {
    return this.props.businesses.displayOptions.locationToggleSwitch
      ? this.props.handleOnChangeFilterOptions('coordinates', '', true)
      : this.props.handleOnChangeFilterOptions(
          'coordinates',
          this.state.bounds,
          false
        );
  }

  _renderResultsInfo() {
    const {
      handleChangePage,
      handleOnChangeBusinessType,
      handleOnChangeFilterOptions,
      businesses,
    } = this.props;
    const {metadata, displayOptions, filters} = businesses;

    if (filters.businessTypes.length === 3) {
      return (
        <ResultInfo
          businessesMetadata={metadata}
          checkBusinessType={handleOnChangeBusinessType}
          handleOnChangeFilterOptions={handleOnChangeFilterOptions}
          filterOptions={filters.businessTypes}
          showBusinessTypes={displayOptions.showBusinessTypes}
          showLoading={showLoading}
        />
      );
    }
    return null;
  }

  _renderLoader() {
    return (
      <div className="load-div">
        <img className="loader" src="static-data/images/loader.gif" />
        <h3 className="loader-text text-regular">{'Loading'}</h3>
      </div>
    );
  }

  _renderBusinesses() {
    return (
      <div>
        <BusinessesList
          organizations={this.props.organizations}
          isMobile={this.props.isMobile}
          selectedOrg={this.state.selectedOrg}
          handleClickOnClearAllFilters={this.props.handleClickOnClearAllFilters}
        />
        <Pagination
          businessesMetadata={this.props.businessesMetadata}
          handleChangePage={this.props.handleChangePage}
        />
      </div>
    );
  }
  render() {
    const {handleChangePage, isMobile, businesses} = this.props;
    const {metadata, organizations, displayOptions} = businesses;

    return (
      <ContentMap
        businesses={businesses}
        toggleSwitch={displayOptions.locationToggleSwitch}
        expanded={this.state.expanded}
        expandMap={() => this.expandMap()}
        onBoundsChange={mapDetails => this.onBoundsChange(mapDetails)}
        reduceMap={() => this.reduceMap()}
        redoSearchInMap={() => this.redoSearchInMap()}
        topBar={this._renderResultsInfo()}
        highlightOrgCard={organizationId =>
          this.highlightOrgCard(organizationId)}
      >
        {showLoading ? this._renderLoader() : this._renderBusinesses()}
      </ContentMap>
    );
  }
}
Main.propTypes = {
  businesses: PropTypes.object.isRequired,
  checkBusinessType: PropTypes.func.isRequired,
  checkLocationToggle: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeBusinessType: PropTypes.func,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Main;
