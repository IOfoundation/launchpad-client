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
  constructor(props) {
    super(props);
    this.state = {
      showBusinessTypes: true,
    };
  }
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

  checkBusinessType(filterValue) {
    const businessTypes = this.props.filters.businessTypes.map(filter => filter.name);
    if (businessTypes.includes(filterValue)) {
      this.setState({showBusinessTypes: !this.state.showBusinessTypes});
    }
  }

  handleOnChangeFilterOptions(filterValue, filterType, removeFilter) {
    const params = this.props.location.query;
    this.getFilterChips();
    this.checkBusinessType(filterValue)
    isEmpty(params.category) ? (
      this.props.actions.filterOrganizations(filterValue, params, filterType)
    ) : (
      this.handleFilterOrganizationsWithParams(
        filterValue,
        params,
        filterType,
        removeFilter
      )
    );
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
    this.setState({showBusinessTypes: true});
    this.props.actions.filterOrganizations(null, null, 'all', true);
  }

  handleChangePage(page) {
    const businessesFilters = this.props.location.query;
    this.props.actions.changePage(page, businessesFilters);
  }

  render() {
    const {filters, organizations, locations, items, metadata} = this.props;
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
                  showBusinessTypes={this.state.showBusinessTypes}
                  filterOptions={filters}
                  organizations={organizations}
                  locations={locations}
                  businessesMetadata={metadata}
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
    queries: routing.locationBeforeTransitions.query,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
