import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

import BusinessesList from './BusinessesList';
import MapView from '../map-view/Main';
import Pagination from './Pagination';
import ResultInfo from './ResultInfo';

class Main extends Component {
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
  _renderReduceButton() {
    return (
      <button className="reduceMapBtn" onClick={() => this._reduceMap()}>
        {'Reduce Map'}
      </button>
    );
  }
  _renderExpandButton() {
    return (
      <div className="row between-xs middle-xs reducedMapBottom">
        <button className="expandMapBtn" onClick={() => this._expandMap()}>
          {'Expand Map'}
        </button>
        <div className="reducedMapBottom_checkContainer">
          <input className="reducedMapBottom_check" type="checkbox" />
          <label className="reducedMapeBottom_checklabel">
            {'Update when map moves'}
          </label>
        </div>
      </div>
    );
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
      <div
        className={
          'businessesContainer ' +
          (this.state.expanded ? '' : 'businessesContainerReduced')
        }
      >
        {this.state.expanded ? null : this._renderResultsInfo()}
        <div
          className={
            'row ' + (this.state.expanded ? '' : 'businessesRow--reduced')
          }
        >
          <div
            className={
              this.state.expanded
                ? 'col-xs-5 businessList noPadding'
                : 'col-xs-8'
            }
          >
            {this.state.expanded ? this._renderResultsInfo() : null}
            <BusinessesList
              businesses={businesses}
              handleClickOnBusiness={handleClickOnBusiness}
              expanded={this.state.expanded}
            />
            <Pagination
              businessesMetadata={businessesMetadata}
              handleChangePage={handleChangePage}
            />
          </div>
          <div
            className={
              'map ' +
              (this.state.expanded
                ? 'col-xs-7 noPadding '
                : 'col-xs-4 mapReduced')
            }
          >
            <MapView businesses={businesses} />
            {this.state.expanded
              ? this._renderReduceButton()
              : this._renderExpandButton()}
          </div>
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
