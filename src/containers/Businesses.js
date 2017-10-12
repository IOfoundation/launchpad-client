import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';

import MainLayout from '../components/layouts/Main';
import FilterBox from '../components/filters/FilterBox';
import BusinessesView from 'components/businesses/Main';
import * as actions from '../actions/business';

export class Businesses extends Component {
  componentWillMount(_nextProps) {
    const params = this.props.location.query;
    this.props.actions.fetchFilterOptions();
    if ('id' in params) {
      this.props.actions.fetchOrganization(params.id);
    } else {
      this.props.actions.filterOrganizations(null, params);
    }
  }

  handleTextSearchBusinesses(filter) {
    this.props.actions.fetchServices(filter);
  }

  handleOnChangeFilterOptions(filterValue) {
    const organizationsFilters = this.props.location.query;
    this.getFilterChips();
    this.props.actions.filterOrganizations(filterValue, organizationsFilters);
  }

  handleOnRemoveFilterOption(filterValue) {
    const organizationsFilters = this.props.location.query;
    this.props.actions.filterOrganizations(
      filterValue,
      organizationsFilters,
      true
    );
  }

  getFilterChips() {
    return this.props.location.query;
  }

  handleClickOnClearAllFilters() {
    this.props.actions.filterOrganizations('', '');
  }

  handleChangePage(page) {
    const businessesFilters = this.props.location.query;
    this.props.actions.changePage(page, businessesFilters);
  }

  handleClickOnBusiness(business) {
    this.props.actions.showBusiness(business);
  }

  render() {
    return (
      <MainLayout>
        <section>
          <div className="search-nav search-nav-invert">
            <div className="row contentContainer">
              <Link to="/">
                <img
                  className="logo"
                  src="static-data/images/ioLogoBlack.png"
                />
              </Link>
              <div className="col-lg-9 col-xs-12 container--full margin-0">
                <h2>
                  {
                    "Where startups and small businesses connect in California's Central Valley"
                  }
                </h2>
                <FilterBox
                  handleTextSearchBusinesses={this.handleTextSearchBusinesses.bind(
                    this
                  )}
                  filterOptions={this.props.filters}
                  handleClickOnClearAllFilters={this.handleClickOnClearAllFilters.bind(
                    this
                  )}
                  handleOnChangeFilterOptions={this.handleOnChangeFilterOptions.bind(
                    this
                  )}
                  handleOnRemoveFilterOption={this.handleOnRemoveFilterOption.bind(
                    this
                  )}
                  getFilterChips={this.getFilterChips.bind(this)}
                />
              </div>
            </div>
          </div>

          <BusinessesView
            filterOptions={this.props.filters}
            organizations={this.props.organizations}
            locations={this.props.locations}
            businessesMetadata={this.props.metadata}
            handleChangePage={this.handleChangePage.bind(this)}
            handleClickOnBusiness={this.handleClickOnBusiness.bind(this)}
            handleClickOnClearAllFilters={this.handleClickOnClearAllFilters.bind(
              this
            )}
            handleOnChangeFilterOptions={this.handleOnChangeFilterOptions.bind(
              this
            )}
          />
        </section>
      </MainLayout>
    );
  }
}

Businesses.propTypes = {
  actions: PropTypes.object,
  filters: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.object).isRequired,
  params: PropTypes.object,
};

const mapStateToProps = _state => {
  const {businesses, routing} = _state;
  return {
    organizations: businesses.organizations,
    locations: businesses.locations,
    filters: businesses.filters,
    metadata: businesses.metadata,
    queries: routing.locationBeforeTransitions.query,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
