import React from 'react';
import {PropTypes} from 'prop-types';

import BusinessesList from './BusinessesList';
import MapView from '../map-view/Main';
import Pagination from './Pagination';
import ResultInfo from './ResultInfo';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
    };
  }

  _reduceMap() {
    this.setState({expanded: false});
  }

  _expandMap() {
    this.setState({expanded: true});
  }

  render() {
    const {
      businessesMetadata,
      businesses,
      handleClickOnBusiness,
      handleChangePage,
    } = this.props;
    return (
      <div className="row ">
        <div className="col-xs-5 noPadding businessList">
          <ResultInfo businessesMetadata={businessesMetadata} />
          <BusinessesList
            businesses={businesses}
            handleClickOnBusiness={handleClickOnBusiness}
          />
          <Pagination
            businessesMetadata={businessesMetadata}
            handleChangePage={handleChangePage}
          />
        </div>
        <div className="col-xs-7 noPadding map">
          <button className="reduceMapBtn" onClick={() => this._reduceMap()}>
            {'Reduce Map'}
          </button>
          <MapView businesses={businesses} />
        </div>
      </div>
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
