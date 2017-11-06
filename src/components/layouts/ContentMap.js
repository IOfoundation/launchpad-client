import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import MapView from '../map-view/Main';
import ResultPage from '../businesses/mobile/ResultPage';

class ContentMap extends Component {
  _renderReduceButton() {
    return (
      <div className="row between-xs middle-xs reducedMapBottom">
          <button
            className="expand-btn map-btn btn-link btn-link-primary text-bold text-bold text-xs-margin p-0 m-bot-8"
            onClick={this.props.reduceMap}
          >
            {'Reduce Map'}
          </button>
        <div className="map-btn">
          <div className="float-right">
            <button
              onClick={this.props.redoSearchInMap}
              className={this.props.toggleOn ?
                ('toggle-btn toggle-on') : ('toggle-btn toggle-off')}
            >
              <span />
            </button>
            <button
              className="btn-link btn-link-primary underline text-xs-margin text-semi"
              onClick={this.props.redoSearchInMap}
            >
              {'Search in Map Area'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  _renderExpandButton() {
    return (
      <div className="row between-xs middle-xs reducedMapBottom">
        <button
          className="expand-btn map-btn btn-link btn-link-primary text-bold text-xs-margin p-0 m-bot-8 m-top-5"
          onClick={this.props.expandMap}
        >
          {'Expand Map'}
        </button>
        <div className="map-btn">
          <div className="float-right">
            <button
              onClick={this.props.redoSearchInMap}
              className={this.props.toggleSwitch ?
                ('toggle-btn toggle-on') : ('toggle-btn toggle-off')}
            >
              <span />
            </button>
            <button
              className="btn-link btn-link-primary underline text-xs-margin text-bold"
              onClick={this.props.redoSearchInMap}
            >
              {'Search in Map Area'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  _renderNoSearchResults() {
    const {businessesMetadata} = this.props;
    return (
      <div className={
        businessesMetadata.totalOrganizations === '0'
          ? 'no-result-message-show col-md-8 col-xs-12 p-left-0 businessList--reduced'
          : 'no-result-message-hide'
        }
      >
        <div className="no-result-message">
          <img src="/static-data/images/search-icon.png" />
          <p className="message desktop-devices">
            {'Sorry but nothing matched your search terms.'}
          </p>
          <p className="message desktop-devices">
            {'Please try again with different keywords'}
          </p>
          <div className="mobile-devices">
            <p className="message">
              {'Sorry but nothing matched your search terms. Please try again with different keywords'}
            </p>
          </div>
        </div>
      </div>
    );
  }
  _renderBusinesses() {
    const {locations, onBoundsChange, businessesMetadata} = this.props;
    return (
    <div>
      <ResultPage
        BusinessesList={this.props.children}
        locations={locations}
        onBoundsChange={onBoundsChange}
        TotalOrganizations={businessesMetadata.totalOrganizations}
      />
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
              ? 'col-md-12 col-xs-12 businessList p-left-0'
              : 'col-md-12 col-xs-12 businessList--reduced p-left-0') + ' list'
          }
          >
          {this.props.children}
        </div>
      </div>
    </div>
    );
  }
  render() {
    const {locations, businessesMetadata, onBoundsChange, organizations} = this.props;
    return (
      <div className="businessesContainer">
        {this.props.topBar}
          <div
            className={
              'map ' +
              (this.props.expanded
                ? 'col-lg-5 col-md-5 col-xs-5 p-0 map-expanded'
                : 'col-lg-3 col-md-3 col-xs-3 p-0')
            }
          >
            <div
              className={
              this.props.expanded
                ? 'map-container-collapse'
                : 'map-container-expand'
              }
              >
            <MapView
              locations={locations}
              onBoundsChange={onBoundsChange}
            />
          </div>
          {this.props.expanded
            ? this._renderReduceButton()
            : this._renderExpandButton()}
        </div>
        {businessesMetadata.totalOrganizations === '0' ?
              this._renderNoSearchResults() :
              this._renderBusinesses()
        }
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
  toggleSwitch: PropTypes.bool,
  topBar: PropTypes.node,
  totalOrganizations: PropTypes.array,
};

export default ContentMap;
