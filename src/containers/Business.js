import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';

import MainLayout from '../components/layouts/Main';
import Logo from '../components/shared/Logo';
import FilterBox from '../components/filters/FilterBox';
import BusinessView from '../components/business/Main';
import * as actions from '../actions/business';

export class Business extends Component {
  componentWillMount(_nextProps) {
    const organizationId = this.props.params.id;
    this.props.actions.fetchOrganization(organizationId);
    this.props.actions.fetchFilterOptions();
  }

  handleTextSearchBusinesses(businessName) {
    const businessesFilters = this.props.location.query;
    this.props.actions.filterBusinessesByName(businessName, businessesFilters);
  }

  handleOnChangeFilterOptions(event) {
    event.preventDefault();
    const businessesFilters = this.props.location.query;
    const filterValue = event.target.id;

    this.props.actions.filterBusinesses(filterValue, businessesFilters);
  }

  render() {
    return (
      <MainLayout>
        <section>
          <div className="search-nav">
            <div className="row contentContainer between-xs">
              <div className="col-xs-3 search-nav_logo noPadding">
                <Logo />
              </div>
              <div className="col-xs-9 search-nav_filters noPadding">
                <FilterBox
                  handleTextSearchBusinesses={this.handleTextSearchBusinesses.bind(
                    this
                  )}
                  filterOptions={this.props.filters}
                  handleOnChangeFilterOptions={this.handleOnChangeFilterOptions.bind(
                    this
                  )}
                />
              </div>
            </div>
          </div>
          <BusinessView business={this.props.business} />
        </section>
      </MainLayout>
    );
  }
}

Business.propTypes = {
  actions: PropTypes.object,
  business: PropTypes.object.isRequired,
  filters: PropTypes.object,
  location: PropTypes.object,
  params: PropTypes.object,
};

const mapStateToProps = _state => {
  const {businesses} = _state;
  return {
    businesses: businesses.businesses,
    filters: businesses.filters,
    metadata: businesses.metadata,
    business: businesses.business,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Business);
