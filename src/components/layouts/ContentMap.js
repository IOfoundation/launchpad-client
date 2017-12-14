import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {isEmpty} from 'lodash';
import MapView from '../map-view/Main';
import ResultPage from '../businesses/mobile/ResultPage';
import Pagination from '../businesses/Pagination';

class ContentMap extends Component {
  shouldComponentUpdate(nextProps) {
    return this.validateComponent(nextProps);
  }

  validateComponent(nextProps) {
    const {
      businesses,
      expanded,
      toggleSwitch,
      selectedOrg,
      isMobile,
    } = this.props;
    if (businesses !== nextProps.businesses) {
      return true;
    } else if (expanded !== nextProps.expanded) {
      return true;
    } else if (toggleSwitch !== nextProps.toggleSwitch) {
      return true;
    } else if (selectedOrg !== nextProps.selectedOrg) {
      return true;
    } else if (isMobile !== nextProps.isMobile) {
      return true;
    }
    return false;
  }

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
    const {
      showLoading,
      children,
      onBoundsChange,
      businesses: {locations, metadata, organizations},
      highlightOrgCard,
      isMobile,
    } = this.props;
    return (
      <ResultPage
        organizations={organizations}
        showLoading={showLoading}
        isMobile={isMobile}
        BusinessesList={children}
        locations={locations}
        onBoundsChange={onBoundsChange}
        totalOrganizations={metadata.totalOrganizations}
        highlightOrgCard={highlightOrgCard}
      />
    );
  }
  _renderBusinesses() {
    const {isMobile, businesses, expanded, children} = this.props;
    const {metadata} = businesses;
    return (
      <div>
        {isMobile ? (
          this._renderResultPageMobile()
        ) : (
          <div
            className={
              metadata.totalOrganizations
                ? 'grid desktop-devices'
                : 'result-container-hide desktop-devices'
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
      businesses: {locations, organizations, metadata},
      topBar,
      expanded,
      toggleSwitch,
      isMobile,
      showLoading,
      handleChangePage,
    } = this.props;
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
              expanded={expanded}
              toggleSwitch={toggleSwitch}
              isMobile={isMobile}
              showLoading={showLoading}
              locations={locations}
              organizations={organizations}
              onBoundsChange={onBoundsChange}
              highlightOrgCard={highlightOrgCard}
            />
          </div>
          {expanded ? this._renderReduceButton() : this._renderExpandButton()}
          <div className="map-pagination">
            <Pagination
              handleChangePage={handleChangePage}
              metadata={metadata}
            />
          </div>
        </div>
        {isEmpty(organizations)
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
  handleChangePage: PropTypes.func.isRequired,
  highlightOrgCard: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object),
  onBoundsChange: PropTypes.func.isRequired,
  redoSearchInMap: PropTypes.func.isRequired,
  reduceMap: PropTypes.func.isRequired,
  selectedOrg: PropTypes.number,
  showLoading: PropTypes.bool,
  toggleSwitch: PropTypes.bool,
  topBar: PropTypes.node,
};

export default ContentMap;
