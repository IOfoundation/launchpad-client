import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router';
import {isEmpty, isString, cloneDeep} from 'lodash';


import MainLayout from '../components/layouts/Main';
import FilterBox from '../components/filters/FilterBox';
import BusinessesView from 'components/businesses/Main';
import * as actions from '../actions/business';

export class Businesses extends Component {
  componentWillMount(_nextProps) {
    const params = this.props.location.query;
    this.props.actions.fetchFilterOptions();
    'id' in params ?
      this.props.actions.filterOrganizations(params.id, params, 'organization') :
      this.props.actions.filterOrganizations(null, params, 'category');
  }

  getTextSearchResults(filter) {
    this.props.actions.fetchSearchResults(filter);
  }

  getBusiness(id) {
    this.props.actions.fetchOrganization(id);
  }

  handleOnChangeFilterOptions(filterValue, filterType, removeFilter) {
    let params = this.props.location.query;

    if (isEmpty(params.category)) {
      this.props.actions.filterOrganizations(filterValue, params, filterType);
    } else {
      if (removeFilter || params.category.includes(filterValue)) {
        this.props.actions.filterOrganizations(filterValue, params,filterType, true)

      } else {
        this.getFilterChips();
        this.props.actions.filterOrganizations(filterValue, params, filterType);
      }
    }
  }

  getFilterChips() {
    return this.props.location.query;
  }

  handleClickOnClearAllFilters() {
    this.props.actions.filterOrganizations('', '');
    this.props.actions.clearOrganization();
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
