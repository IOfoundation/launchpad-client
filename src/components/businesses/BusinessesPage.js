import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FilterBox from '../filters/FilterBox';
import FilterBoxMobile from '../filters/FilterBoxMobile';
import BusinessesView from './Main';
import {Link} from 'react-router';

class BusinessesPage extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      appliedFilters,
      organizations,
      displayOptions,
      businessesMetadata,
      filterOptions,
      windowWidth,
    } = this.props;
    if (
      appliedFilters !== nextProps.appliedFilters ||
      organizations !== nextProps.organizations ||
      displayOptions !== nextProps.displayOptions ||
      businessesMetadata !== nextProps.businessesMetadata ||
      filterOptions !== nextProps.filterOptions ||
      windowWidth !== nextProps.windowWidth
    ) {
      return true;
    }
  }

  renderFilterBoxMobile() {
    return (
      <FilterBoxMobile
        getTextSearchResults={this.props.getTextSearchResults}
        filterOptions={this.props.filterOptions}
        items={this.props.items}
        handleClickOnClearAllFilters={this.props.handleClickOnClearAllFilters}
        handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
        appliedFilters={this.props.appliedFilters}
        filterById={this.props.filterById}
        organization={this.props.organizations}
      />
    );
  }
  renderFilterBoxDesktop() {
    return (
      <FilterBox
        getTextSearchResults={this.props.getTextSearchResults}
        filterOptions={this.props.filterOptions}
        items={this.props.items}
        filterById={this.props.filterById}
        handleClickOnClearAllFilters={this.props.handleClickOnClearAllFilters}
        handleOnChangeFilterOptions={this.props.handleOnChangeFilterOptions}
        appliedFilters={this.props.appliedFilters}
        organization={this.props.organizations}
      />
    );
  }

  render() {
    const isMobile = this.props.windowWidth <= 960;
    return (
      <section>
        <div className="search-nav search-nav-invert">
          <div className="row contentContainer">
            <div>
              <Link className="desktop-devices" to="/">
                <img
                  className="logo"
                  src="static-data/images/ioLogoBlack.png"
                />
              </Link>
            </div>
            <div className="col-lg-9 col-md-9 col-xs-9 body-container">
              <h2 className="desktop-devices">
                {
                  "Where startups and small businesses connect in California's Capital Region"
                }
              </h2>
              {isMobile
                ? this.renderFilterBoxMobile()
                : this.renderFilterBoxDesktop()}
              <BusinessesView
                displayOptions={this.props.displayOptions}
                filterOptions={this.props.filterOptions}
                organizations={this.props.organizations}
                locations={this.props.locations}
                isMobile={isMobile}
                showLoading={this.props.showLoading}
                businessesMetadata={this.props.businessesMetadata}
                checkBusinessType={this.props.checkBusinessType}
                checkLocationToggle={this.props.checkBusinessType}
                handleChangePage={this.props.handleChangePage}
                handleClickOnClearAllFilters={
                  this.props.handleClickOnClearAllFilters
                }
                handleOnChangeFilterOptions={
                  this.props.handleOnChangeFilterOptions
                }
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

BusinessesPage.propTypes = {
  appliedFilters: PropTypes.object,
  businessesMetadata: PropTypes.object,
  BusinessPage: PropTypes.arrayOf(PropTypes.object),
  checkBusinessType: PropTypes.func,
  displayOptions: PropTypes.object.isRequired,
  filterById: PropTypes.bool,
  getTextSearchResults: PropTypes.func,
  handleChangePage: PropTypes.func,
  handleClickOnClearAllFilters: PropTypes.func,
  handleOnChangeFilterOptions: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object),
  locations: PropTypes.arrayOf(PropTypes.object),
  organizations: PropTypes.arrayOf(PropTypes.object),
  windowWidth: PropTypes.number,
};

export default BusinessesPage;
