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
      toggleOn: false,
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
    if (this.state.toggleOn === true) {
      this.props.handleOnChangeFilterOptions(this.state.bounds, 'coordinates');
    }
  }

  redoSearchInMap() {
    if(this.state.toggleOn === false) {
      this.props.handleOnChangeFilterOptions(this.state.bounds, 'coordinates');
    }
    this.setState({toggleOn: !this.state.toggleOn});
  }

  _renderResultsInfo() {
    if (this.props.filterOptions.businessTypes.length === 3) {
      return (
        <ResultInfo
          businessesMetadata={this.props.businessesMetadata}
          handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
          filterOptions={this.props.filterOptions.businessTypes}
          showBusinessTypes={this.props.showBusinessTypes}
        />
      );
    }
    return null;
  }

  _renderLoader() {
  return (
      <div className="loadDiv">
        <img className="loader" src="static-data/images/loader.gif"/>
      </div>
    );
  }

  _renderBusinesses() {
    return (
      <BusinessesList
        organizations={this.props.organizations}
        handleClickOnClearAllFilters={this.props.handleClickOnClearAllFilters}
      />
    );
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
        organizations={organizations}
        businessesMetadata={businessesMetadata}
        expanded={this.state.expanded}
        expandMap={() => this.expandMap()}
        onBoundsChange={(mapDetails) => this.onBoundsChange(mapDetails)}
        reduceMap={() => this.reduceMap()}
        redoSearchInMap={() => this.redoSearchInMap()}
        topBar={this._renderResultsInfo()}
        toggleOn={this.state.toggleOn}
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
  filterOptions: PropTypes.object.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleClickOnClearAllFilters: PropTypes.func.isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object),
  showBusinessTypes: PropTypes.bool,

};

export default Main;
