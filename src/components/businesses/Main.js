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
      businesses,
      handleClickOnBusiness,
      handleChangePage,
    } = this.props;
    return (
      <ContentMap
        businesses={businesses}
        businessesMetadata={businessesMetadata}
        expanded={this.state.expanded}
        expandMap={this.expandMap}
        reduceMap={this.reduceMap}
        topBar={this._renderResultsInfo()}
      >
        <BusinessesList
          businesses={businesses}
          handleClickOnBusiness={handleClickOnBusiness}
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
  businesses: PropTypes.array.isRequired,
  businessesMetadata: PropTypes.object.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleClickOnBusiness: PropTypes.func.isRequired,
};

export default Main;
