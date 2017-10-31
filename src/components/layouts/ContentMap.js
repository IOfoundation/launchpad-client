import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {MdSearch} from 'react-icons/lib/md';
import MapView from '../map-view/Main';
import ResultPage from '../businesses/mobile/ResultPage';

class ContentMap extends Component {
  _renderReduceButton() {
    return (
      <div className="row between-xs middle-xs reducedMapBottom">
        <button
          className="btn-link btn-link-primary text-bold"
          onClick={this.props.reduceMap}
        >
          {'Reduce Map'}
        </button>
        <button
          className="btn-link btn-link-primary underline text-xs-margin"
          onClick={this.props.redoSearchInMap}
        >
          {'Redo Search in Map Area'}
        </button>
      </div>
    );
  }
  _renderExpandButton() {
    return (
      <div className="row between-xs middle-xs reducedMapBottom">
        <button
          className="btn-link btn-link-primary text-bold text-xs-margin p-0 m-bot-8"
          onClick={this.props.expandMap}
        >
          {'Expand Map'}
        </button>
        <button
          className="btn-link btn-link-primary underline text-xs-margin p-0"
          onClick={this.props.redoSearchInMap}
        >
          {'Redo Search in Map Area'}
        </button>
      </div>
    );
  }
  render() {
    const {locations, businessesMetadata, onBoundsChange, organizations} = this.props;
    return (
      <div className="businessesContainer">
        {this.props.topBar}
        <div className={
            businessesMetadata.totalOrganizations === '0' ? (
              'no-result-message-show'
            ) : (
              'no-result-message-hide'
            )
          }
        >
          <div className="no-result-message">
            <img src="/static-data/images/search-icon.png" />
            <p className="message desktop-devices">
              {'Sorry but nothing matched your search terms.'}
            </p>
            <p className="message desktop-devices">
              {'Please try Again with different Keywords'}
            </p>
            <div className="mobile-devices">
              <p className="message">
                {'Sorry but nothing matched your search terms. Please try Again with different Keywords'}
              </p>
            </div>
          </div>
        </div>
        <div className={organizations.length === 0 ? 'result-container-hide' : ''}>
          <ResultPage
            BusinessesList={this.props.children}
            locations={locations}
            onBoundsChange={onBoundsChange}
            TotalOrganizations={businessesMetadata.totalOrganizations}
          />
        </div>
        <div className={
            businessesMetadata.totalOrganizations === '0' ? (
              'result-container-hide desktop-devices'
            ) : (
              'grid desktop-devices'
            )
          }
        >
          <div
            className={
              (this.props.expanded
                ? 'col-md-7 col-xs-7 businessList p-left-0'
                : 'col-md-9 col-xs-9 businessList--reduced p-left-0') + ' list'
            }
          >
            {this.props.children}
          </div>
          <div
            className={
              'map ' +
              (this.props.expanded
                ? 'col-lg-5 col-md-5 col-xs-5 p-0'
                : 'col-lg-3 col-md-3 col-xs-3 p-0')
            }
          >
            <div
              className={
                this.props.expanded ? (
                  'map-container-collapse'
                ) : (
                  'map-container-expand'
                )
              }
            >
              <MapView locations={locations} onBoundsChange={onBoundsChange}/>
            </div>
            {this.props.expanded ? (
              this._renderReduceButton()
            ) : (
              this._renderExpandButton()
              )}
          </div>
        </div>
      </div>
    );
  }
}

ContentMap.propTypes = {
  businessesMetadata: PropTypes.object,
  children: PropTypes.node,
  expanded: PropTypes.bool,
  expandMap: PropTypes.func.isRequired,
  locations: PropTypes.array,
  onBoundsChange: PropTypes.func,
  redoSearchInMap: PropTypes.func.isRequired,
  reduceMap: PropTypes.func.isRequired,
  topBar: PropTypes.node,
  totalOrganizations: PropTypes.array,
};

export default ContentMap;
