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
    const locationsFilters = this.props.location.query;
    this.props.actions.fetchFilterOptions();
    this.props.actions.filterBusinesses(null, locationsFilters);
  }

  handleTextSearchBusinesses(businessName) {
    const businessesFilters = this.props.location.query;
    this.props.actions.filterBusinessesByName(businessName, businessesFilters);
  }

  handleOnChangeFilterOptions(filterValue) {
    console.log(1)
    const locationsFilters = this.props.location.query;
    this.getFilterChips();
    this.props.actions.filterBusinesses(filterValue, locationsFilters);
  }

  handleOnRemoveFilterOption(filterValue) {
    const locationsFilters = this.props.location.query;
    this.props.actions.filterBusinesses(filterValue, locationsFilters, true);
  }

  getFilterChips() {
    return this.props.location.query;
  }

  handleClickOnClearAllFilters() {
    this.props.actions.filterBusinesses('', '');
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
  organizations: PropTypes.array.isRequired,
  params: PropTypes.object,
};

const mapStateToProps = _state => {
  const {businesses, routing} = _state;
  return {
    organizations: businesses.organizations,
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
