import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';
import {isEmpty, isString, cloneDeep} from 'lodash';

import MainLayout from '../components/layouts/Main';
import FilterBox from '../components/filters/FilterBox';
import FilterBoxMobile from '../components/filters/FilterBoxMobile';
import BusinessesView from 'components/businesses/Main';
import * as actions from '../actions/business';

export class Businesses extends Component {
  componentWillMount(_nextProps) {
    const params = this.props.location.query;
    this.props.actions.fetchFilterOptions();
    const locationToggleSwitch = 'ne_lat' in params ? true : false;
    const showBusinessTypes = this.checkBusinessType(params.category);
    this.props.actions.changeFilterDisplayOptions(showBusinessTypes, locationToggleSwitch);
    'id' in params ?
      this.props.actions.filterOrganizations(params.id, params, 'organization', true) :
      this.props.actions.filterOrganizations(null, params, 'category');
  }

  checkBusinessType(filters) {
    const businessTypes = ['Startup or High-Growth Business', 'Main Street or Small Business', 'Microenterprise or Home Based Business'];
    isEmpty(filters) || (isString(filters) ? businessTypes.includes(filters) ? false : true : filters.map(filter => businessTypes.includes(filter)) ? false : true);
  }

  getTextSearchResults(filter) {
    this.props.actions.fetchSearchResults(filter);
  }

  handleOnChangeBusinessType(filterValue) {
    const showBusinessTypes = this.props.displayOptions.showBusinessTypes;
    const businessTypes = this.props.filters.businessTypes.map(filter => filter.name);
    if (filterValue) {
      return businessTypes.includes(filterValue)? !showBusinessTypes: showBusinessTypes;
    }
    return showBusinessTypes;
  }

  handleOnChangeLocationToggle(filterType, removeFilter) {
    const locationToggleSwitch = this.props.displayOptions.locationToggleSwitch;
    if (filterType === 'coordinates') {
      return !removeFilter ? true : false;
    }
    return locationToggleSwitch;
  }

  handleOnChangeFilterOptions(filterValue, filterType, removeFilter) {
    const params = this.props.queries;
    this.props.actions.changeFilterDisplayOptions(
      this.handleOnChangeBusinessType(filterValue),
      this.handleOnChangeLocationToggle(filterType, removeFilter)
    );
    this.getFilterChips(filterValue);
    if (!isEmpty(params.category)) {
      removeFilter = removeFilter ? removeFilter : params.category.includes(filterValue) ? true : false;
    }
    this.props.actions.filterOrganizations(filterValue, params, filterType, removeFilter)
  }

  getFilterChips() {
    return this.props.queries;
  }

  handleClickOnClearAllFilters() {
    this.props.actions.filterOrganizations(null, null, 'all', true);
    this.props.actions.changeFilterDisplayOptions(true, false);

  }

  handleChangePage(page) {
    const businessesFilters = this.props.location.query;
    this.props.actions.changePage(page, businessesFilters);
  }

  render() {
    const {displayOptions, filters, organizations, locations, items, metadata} = this.props;
    return (
      <MainLayout>
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
                    "Where startups and small businesses connect in California's Central Valley"
                  }
                </h2>
                <div className="desktop-devices">
                  <FilterBox
                    getTextSearchResults={(e) => this.getTextSearchResults(e)}
                    filterOptions={filters}
                    items={items}
                    handleClickOnClearAllFilters={(e) =>
                      this.handleClickOnClearAllFilters(e)}
                    handleOnChangeFilterOptions={(filterValue, filterType, removeFilter) =>
                      this.handleOnChangeFilterOptions(filterValue, filterType, removeFilter)}
                    getFilterChips={(e) => this.getFilterChips()}
                  />
                </div>
                <div className="mobile-devices">
                  <FilterBoxMobile
                    getTextSearchResults={(e) => this.getTextSearchResults(e)}
                    filterOptions={filters}
                    items={items}
                    handleClickOnClearAllFilters={(e) =>
                      this.handleClickOnClearAllFilters(e)}
                    handleOnChangeFilterOptions={(filterValue, filterType, removeFilter) =>
                      this.handleOnChangeFilterOptions(filterValue, filterType, removeFilter)}
                    getFilterChips={(e) => this.getFilterChips()}
                  />
                </div>
                <BusinessesView
                  displayOptions={displayOptions}
                  filterOptions={filters}
                  organizations={organizations}
                  locations={locations}
                  businessesMetadata={metadata}
                  checkBusinessType={(filterValue) => this.handleOnChangeBusinessType(filterValue)}
                  checkLocationToggle={() => this.handleOnChangeLocationToggle()}
                  handleChangePage={(e) => this.handleChangePage(e)}
                  handleClickOnClearAllFilters={(e) =>
                    this.handleClickOnClearAllFilters(e)}
                  handleOnChangeFilterOptions={(filterValue, filterType, removeFilter) =>
                    this.handleOnChangeFilterOptions(filterValue, filterType, removeFilter)}
                />
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  }
}

Businesses.propTypes = {
  actions: PropTypes.object,
  displayOptions: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  filters: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object),
  params: PropTypes.object,
};

const mapStateToProps = _state => {
  const {businesses, routing} = _state;
  return {
    displayOptions: businesses.displayOptions,
    items: businesses.items,
    filters: businesses.filters,
    locations: businesses.locations,
    metadata: businesses.metadata,
    organizations: businesses.organizations,
    queries: routing.locationBeforeTransitions.query,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
