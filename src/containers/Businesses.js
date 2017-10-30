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
    'id' in params ?
      this.props.actions.filterOrganizations(params.id, params, 'organization', true) :
      this.props.actions.filterOrganizations(null, params, 'category');
  }

  getTextSearchResults(filter) {
    this.props.actions.fetchSearchResults(filter);
  }

  handleOnChangeFilterOptions(filterValue, filterType, removeFilter) {
    const params = this.props.location.query;
    isEmpty(params.category) ? (
      this.props.actions.filterOrganizations(filterValue, params, filterType)
    ) : (
      this.handleFilterOrganizationsWithParams(filterValue, params, filterType, removeFilter)
    );
    this.getFilterChips();
  }

  handleFilterOrganizationsWithParams(filterValue, params, filterType, removeFilter) {
    removeFilter || params.category.includes(filterValue) ? (
      this.props.actions.filterOrganizations(filterValue, params,filterType, true)
    ) : (
      this.props.actions.filterOrganizations(filterValue, params, filterType)
    );
  }

  getFilterChips() {
    return this.props.location.query;
  }

  handleClickOnClearAllFilters() {
    this.props.actions.filterOrganizations(null, null, 'all', true);
  }

  handleChangePage(page) {
    const businessesFilters = this.props.location.query;
    this.props.actions.changePage(page, businessesFilters);
  }

  _renderLoader() {
  return (
      <div className="loadDiv">
        <div className="loading"> </div>
      </div>
    );
  }

  render() {
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
                    filterOptions={this.props.filters}
                    items={this.props.items}
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
                    filterOptions={this.props.filters}
                    items={this.props.items}
                    handleClickOnClearAllFilters={(e) =>
                      this.handleClickOnClearAllFilters(e)}
                    handleOnChangeFilterOptions={(filterValue, filterType, removeFilter) =>
                      this.handleOnChangeFilterOptions(filterValue, filterType, removeFilter)}
                    getFilterChips={(e) => this.getFilterChips()}
                  />
                </div>
                <BusinessesView
                  filterOptions={this.props.filters}
                  organizations={this.props.organizations}
                  organization={this.props.organization}
                  locations={this.props.locations}
                  businessesMetadata={this.props.metadata}
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
  items: PropTypes.arrayOf(PropTypes.object),
  filters: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object),
  organization: PropTypes.object,
  params: PropTypes.object,
};

const mapStateToProps = _state => {
  const {businesses, routing} = _state;
  return {
    items: businesses.items,
    filters: businesses.filters,
    locations: businesses.locations,
    metadata: businesses.metadata,
    organizations: businesses.organizations,
    organization: businesses.organization,
    queries: routing.locationBeforeTransitions.query,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
