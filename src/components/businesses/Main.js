import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import BusinessesList from './BusinessesList';
import Pagination from './Pagination';
import ResultInfo from './ResultInfo';
import ContentMap from '../layouts/ContentMap';

class Main extends Component {
  state = {
    expanded: false,
    bounds: {},
    selectedOrg: -1,
  };

  reduceMap = () => {
    this.setState({expanded: false});
  };

  expandMap = () => {
    this.setState({expanded: true});
  };

  onBoundsChange = mapDetails => {
    const {handleOnChangeFilterOptions, businesses} = this.props;
    this.setState({bounds: mapDetails.bounds});
    if (businesses.displayOptions.locationToggleSwitch) {
      handleOnChangeFilterOptions('coordinates', this.state.bounds, false);
    }
  };

  highlightOrgCard = organizationId => {
    this.setState({selectedOrg: organizationId});
  };

  redoSearchInMap = () => {
    const {businesses, handleOnChangeFilterOptions} = this.props;
    return businesses.displayOptions.locationToggleSwitch
      ? handleOnChangeFilterOptions('coordinates', '', true)
      : handleOnChangeFilterOptions('coordinates', this.state.bounds, false);
  };

  _renderResultsInfo = () => {
    const {handleOnChangeFilterOptions, businesses, showLoading} = this.props;
    const {metadata, displayOptions, filters} = businesses;

    if (filters.businessTypes.length === 3) {
      return (
        <ResultInfo
          metadata={metadata}
          handleOnChangeFilterOptions={handleOnChangeFilterOptions}
          filterOptions={filters.businessTypes}
          showBusinessTypes={displayOptions.showBusinessTypes}
          showLoading={showLoading}
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
    const {organizations, metadata, appliedFilters} = businesses;
    return (
      <div>
        <BusinessesList
          organizations={organizations}
          isMobile={isMobile}
          selectedOrg={this.state.selectedOrg}
        />
        <Pagination
          appliedFilters={appliedFilters}
          metadata={metadata}
          handleChangePage={handleChangePage}
        />
      </div>
    );
  };
  render() {
    const {isMobile, businesses, showLoading, handleChangePage} = this.props;
    const {displayOptions} = businesses;
    return (
      <ContentMap
        businesses={businesses}
        isMobile={isMobile}
        showLoading={showLoading}
        toggleSwitch={displayOptions.locationToggleSwitch}
        selectedOrg={this.state.selectedOrg}
        expanded={this.state.expanded}
        expandMap={this.expandMap}
        onBoundsChange={this.onBoundsChange}
        reduceMap={this.reduceMap}
        redoSearchInMap={this.redoSearchInMap}
        topBar={this._renderResultsInfo()}
        highlightOrgCard={this.highlightOrgCard}
        handleChangePage={handleChangePage}
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
  showLoading: PropTypes.bool,
};

export default Main;
