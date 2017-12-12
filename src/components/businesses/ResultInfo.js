import React from 'react';
import {PropTypes} from 'prop-types';
import ArrowRight from '../shared/ArrowRight';

const ResultInfo = props => {
  function _onClick(filter) {
    props.handleOnChangeFilterOptions('category', filter.name, false);
  }

  function displayOrganizationLabel(totalOrganizations) {
    return totalOrganizations === 1
      ? `${totalOrganizations} Organization Available`
      : `${totalOrganizations} Organizations Available`;
  }

  function renderButtonBusinessTypeContainer() {
    return (
      <div className="business-type-container col-lg-12 p-0 grid">
        <div className="col-xs-4 col-md-4 col-lg-4 m-bot-16 p-0">
          <button
            className="btn btn-search btn-outline"
            key={props.filterOptions[0].id}
            onClick={() => _onClick(props.filterOptions[0])}
          >
            <div className="btn-search-text text-bold">
              <span className="desktop-devices">{'Startup or High'}</span>
              <span className="desktop-devices">{'Growth Business'}</span>
              <span className="mobile-devices">
                {'Startup or High Growth Business'}
              </span>
            </div>
            <ArrowRight
              className="btn-search-icon"
              size={20}
              style={{color: '#000', verticalAlign: 'middle'}}
            />
          </button>
        </div>
        <div className="col-xs-4 col-md-4 col-lg-4 m-bot-16 p-right-0">
          <button
            className="btn btn-search btn-outline"
            key={props.filterOptions[1].id}
            onClick={() => this._onClick(props.filterOptions[1])}
          >
            <div className="btn-search-text text-bold">
              <span className="desktop-devices">{'Main Street/'}</span>
              <span className="desktop-devices">{'Small Business'}</span>
              <span className="mobile-devices">
                {'Main Street/Small Business'}
              </span>
            </div>
            <ArrowRight
              className="btn-search-icon"
              size={20}
              style={{color: '#000', verticalAlign: 'middle'}}
            />
          </button>
        </div>
        <div className="col-xs-4 col-md-4 col-lg-4 m-bot-16 p-right-0">
          <button
            className="btn btn-search btn-outline"
            key={props.filterOptions[2].id}
            onClick={() => _onClick(props.filterOptions[2])}
          >
            <div className="btn-search-text text-bold">
              <span className="desktop-devices">{'Microenterprise or'}</span>
              <span className="desktop-devices">{'Home-Based Business'}</span>
              <span className="mobile-devices">
                {'Microenterprise or Home-Based Business'}
              </span>
            </div>
            <ArrowRight
              className="btn-search-icon"
              size={20}
              style={{color: '#000', verticalAlign: 'middle'}}
            />
          </button>
        </div>
      </div>
    );
  }
  function renderLocationTotal() {
    const {
      totalLocations,
      showLoading,
      locationsInView,
      displayOptions,
    } = props;
    const locationsText = locationsInView === 1 ? 'Location' : 'Locations';
    if (displayOptions.locationToggleSwitch) {
      return (
        <h4 className="col-xs-4 col-md-4 col-lg-4 m-top-24 no-padding text-right">
          Searching Locations in Map Area
        </h4>
      );
    }
    return (
      <h4 className="col-xs-4 col-md-4 col-lg-4 m-top-24 no-padding text-right">
        {showLoading
          ? 'Loading Locations'
          : `${locationsInView} ${locationsText} Displayed in Map Of ${totalLocations}`}
      </h4>
    );
  }

  const {showBusinessTypes, metadata, showLoading} = props;
  const {totalOrganizations} = metadata;
  return (
    <div className="grid business-type-btn">
      {showBusinessTypes && (
        <p className="m-bot-16 col-xs-12 col-md-12 col-lg-12 p-0 business-type-label">
          {'Select a business type that represents you.'}
        </p>
      )}
      {showBusinessTypes && renderButtonBusinessTypeContainer()}
      {totalOrganizations && (
        <div className="col-lg-12 col-md-12 col-xs-12 p-0 desktop-devices grid">
          <h3 className="m-top-24 col-xs-8 col-md-8 col-lg-8 no-padding">
            {showLoading
              ? 'Loading Organizations'
              : displayOrganizationLabel(totalOrganizations)}
          </h3>
          {renderLocationTotal()}
          <hr className="col-lg-12 col-md-12 col-xs-12 m-bot-24 m-top-16" />
        </div>
      )}
    </div>
  );
};

ResultInfo.propTypes = {
  displayOptions: PropTypes.object,
  filterOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOnChangeFilterOptions: PropTypes.func.isRequired,
  locationsInView: PropTypes.number,
  metadata: PropTypes.shape({}).isRequired,
  showBusinessTypes: PropTypes.bool,
  showLoading: PropTypes.bool.isRequired,
  totalLocations: PropTypes.number.isRequired,
};

export default ResultInfo;
