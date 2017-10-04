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
    return <ResultInfo businessesMetadata={this.props.businessesMetadata} />;
  }
  render() {
    const {
      businessesMetadata,
      locations,
      organizations,
      handleClickOnBusiness,
      handleClickOnClearFilters,
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
          handleClickOnClearFilters={handleClickOnClearFilters}
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
  locations: PropTypes.array.isRequired,
  organizations: PropTypes.array.isRequired,
  businessesMetadata: PropTypes.object.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleClickOnBusiness: PropTypes.func.isRequired,
  handleClickOnClearFilters: PropTypes.func.isRequired,
};

export default Main;
