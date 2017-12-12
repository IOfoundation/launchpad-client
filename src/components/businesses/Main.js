import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import BusinessesList from './BusinessesList';
import Pagination from './Pagination';
import ResultInfo from './ResultInfo';
import ContentMap from '../layouts/ContentMap';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrg: -1,
    };
  }

  highlightOrgCard = organizationId => {
    this.setState({selectedOrg: organizationId});
  };

  redoSearchInMap = () => {
    const {
      businesses: {mapProps, displayOptions, locations},
      handleOnChangeFilterOptions,
      mapActions: {getLocationsInView},
    } = this.props;
    if (displayOptions.locationToggleSwitch) {
      handleOnChangeFilterOptions('coordinates', '', true);
    } else {
      handleOnChangeFilterOptions('coordinates', mapProps.bounds, false);
    }
    getLocationsInView(locations);
  };

  _renderResultsInfo = () => {
    const {handleOnChangeFilterOptions, businesses, showLoading} = this.props;
    const {
      metadata,
      displayOptions,
      filters,
      locations,
      mapProps: {locationsInView},
    } = businesses;
    if (filters.businessTypes.length === 3) {
      return (
        <ResultInfo
          toggleSwitch={displayOptions.locationToggleSwitch}
          locationsInView={locationsInView}
          metadata={metadata}
          handleOnChangeFilterOptions={handleOnChangeFilterOptions}
          filterOptions={filters.businessTypes}
          showBusinessTypes={displayOptions.showBusinessTypes}
          showLoading={showLoading}
          displayOptions={displayOptions}
          totalLocations={locations ? locations.length : 0}
        />
      );
    }
    return null;
  };

  _renderLoader = () => {
    return (
      <div className="load-div">
        <img className="loader" src="static-data/images/loader.gif" />
        <h3 className="loader-text text-regular">{'Loading'}</h3>
      </div>
    );
  };

  _renderBusinesses = () => {
    const {handleChangePage, businesses, isMobile} = this.props;
    const {organizations, metadata} = businesses;
    return (
      <div>
        <BusinessesList
          organizations={organizations}
          isMobile={isMobile}
          selectedOrg={this.state.selectedOrg}
        />
        <Pagination metadata={metadata} handleChangePage={handleChangePage} />
      </div>
    );
  };
  render() {
    const {isMobile, businesses, showLoading, mapActions} = this.props;
    const {displayOptions} = businesses;
    return (
      <ContentMap
        businesses={businesses}
        isMobile={isMobile}
        showLoading={showLoading}
        toggleSwitch={displayOptions.locationToggleSwitch}
        selectedOrg={this.state.selectedOrg}
        redoSearchInMap={this.redoSearchInMap}
        topBar={this._renderResultsInfo()}
        highlightOrgCard={this.highlightOrgCard}
        mapActions={mapActions}
      >
        {showLoading ? this._renderLoader() : this._renderBusinesses()}
      </ContentMap>
    );
  }
}
Main.propTypes = {
  businesses: PropTypes.object.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeBusinessType: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  handleOnChangeLocationToggle: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  mapActions: PropTypes.object,
  showLoading: PropTypes.bool,
};

export default Main;
