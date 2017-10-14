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

  getTextSearchResults(filter) {
    this.props.actions.fetchSearchResults(filter);
  }

  getBusiness(id) {
    this.props.actions.fetchOrganization(id);
  }

  handleOnChangeFilterOptions(filterValue, isId) {
    let params = this.props.location.query;
    if (isId) {
      this.props.actions.fetchOrganization(filterValue, params);
    } else {
      this.getFilterChips();
      this.props.actions.filterOrganizations(filterValue, params);
    }
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
    this.props.actions.getBusiness(business);
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
                  getTextSearchResults={this.getTextSearchResults.bind(
                    this
                  )}
                  filterOptions={this.props.filters}
                  items={this.props.items}
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
                  getBusiness={this.getBusiness.bind(this)}
                />
              </div>
            </div>
          </div>

          <BusinessesView
            filterOptions={this.props.filters}
            organizations={this.props.organizations}
            organization={this.props.organization}
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
  organizations: PropTypes.arrayOf(PropTypes.object),
  organization: PropTypes.object,
  params: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = _state => {
  const {businesses, routing} = _state;
  return {
    organizations: businesses.organizations,
    organization: businesses.organization,
    locations: businesses.locations,
    filters: businesses.filters,
    metadata: businesses.metadata,
    queries: routing.locationBeforeTransitions.query,
    items: businesses.items,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
