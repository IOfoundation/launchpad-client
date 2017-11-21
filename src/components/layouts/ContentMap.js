import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import MapView from '../map-view/Main';
import ResultPage from '../businesses/mobile/ResultPage';

class ContentMap extends Component {
  _renderReduceButton() {
    const {reduceMap, redoSearchInMap, toggleSwitch} = this.props;
    return (
      <div className="row between-xs middle-xs reducedMapBottom">
        <button
          className="expand-btn map-btn btn-link btn-link-primary text-bold text-bold text-xs-margin p-0 m-bot-8"
          onClick={reduceMap}
        >
          {'Reduce Map'}
        </button>
        <div className="map-btn">
          <div className="float-right">
            <button
              onClick={redoSearchInMap}
              className={
                toggleSwitch ? 'toggle-btn toggle-on' : 'toggle-btn toggle-off'
              }
            >
              <span />
            </button>
            <button
              className="btn-link btn-link-primary underline text-xs-margin text-bold"
              onClick={redoSearchInMap}
            >
              {'Search in Map Area'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  _renderExpandButton() {
    const {expandMap, redoSearchInMap, toggleSwitch} = this.props;
    return (
      <div className="row between-xs middle-xs reducedMapBottom">
        <button
          className="expand-btn map-btn btn-link btn-link-primary text-bold text-xs-margin p-0 m-bot-8 m-top-5"
          onClick={expandMap}
        >
          {'Expand Map'}
        </button>
        <div className="map-btn">
          <div className="float-right">
            <button
              onClick={redoSearchInMap}
              className={
                toggleSwitch ? 'toggle-btn toggle-on' : 'toggle-btn toggle-off'
              }
            >
              <span />
            </button>
            <button
              className="btn-link btn-link-primary underline text-xs-margin text-bold"
              onClick={redoSearchInMap}
            >
              {'Search in Map Area'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  _renderNoSearchResults() {
    const {metadata} = this.props.businesses;
    return (
      <div
        className={
          metadata.totalOrganizations
            ? 'no-result-message-show col-md-8 col-xs-12 businessList--reduced'
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
              {
                'Sorry but nothing matched your search terms. Please try again with different keywords'
              }
            </p>
          </div>
        </div>
      </div>
    );
  }
  _renderResultPageMobile() {
    const {locations, metadata} = this.props.businesses;
    return (
      <ResultPage
        showLoading={this.props.showLoading}
        BusinessesList={this.props.children}
        locations={locations}
        onBoundsChange={this.props.onBoundsChange}
        TotalOrganizations={metadata.totalOrganizations}
        highlightOrgCard={this.props.highlightOrgCard}
      />
    );
  }
  _renderBusinesses() {
    const {
      onBoundsChange,
      isMobile,
      businesses,
      expanded,
      children,
    } = this.props;
    const {locations, metadata} = businesses;
    return (
      <div>
        {isMobile ? (
          this._renderResultPageMobile()
        ) : (
          <div
            className={
              metadata.totalOrganizations === '0'
                ? 'result-container-hide desktop-devices'
                : 'grid desktop-devices'
            }
          >
            <div
              className={
                (expanded
                  ? 'col-md-12 col-xs-12 businessList p-left-0'
                  : 'col-md-12 col-xs-12 businessList--reduced p-left-0') +
                ' list'
              }
            >
              {children}
            </div>
          </div>
        )}
      </div>
    );
  }
  render() {
    const {
      onBoundsChange,
      highlightOrgCard,
      businesses,
      topBar,
      expanded,
    } = this.props;
    const {organizations, locations, metadata} = businesses;
    return (
      <div className="businessesContainer">
        {topBar}
        <div
          className={
            'map m-bot-20 ' +
            (expanded
              ? 'col-lg-5 col-md-5 col-xs-5 p-0 map-expanded'
              : 'col-lg-3 col-md-3 col-xs-3 p-0')
          }
        >
          <div
            className={
              expanded ? 'map-container-collapse' : 'map-container-expand'
            }
          >
            <MapView
              locations={locations}
              onBoundsChange={onBoundsChange}
              highlightOrgCard={highlightOrgCard}
            />
          </div>
          {expanded ? this._renderReduceButton() : this._renderExpandButton()}
        </div>
        {metadata.totalOrganizations === '0'
          ? this._renderNoSearchResults()
          : this._renderBusinesses()}
      </div>
    );
  }
}

ContentMap.propTypes = {
  businesses: PropTypes.object,
  children: PropTypes.node,
  expanded: PropTypes.bool,
  expandMap: PropTypes.func.isRequired,
  highlightOrgCard: PropTypes.func.isRequired,
  onBoundsChange: PropTypes.func,
  redoSearchInMap: PropTypes.func.isRequired,
  reduceMap: PropTypes.func.isRequired,
  topBar: PropTypes.node,
  totalOrganizations: PropTypes.array,
};

export default ContentMap;
