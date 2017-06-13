import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';

import MainLayout from '../components/layouts/Main';
import Logo from '../components/shared/Logo';
import FilterBox from '../components/filters/FilterBox';
import BusinessesView from 'components/businesses/Main';
import * as actions from '../actions/business';

export class Businesses extends Component {
  componentWillMount(_nextProps) {
    const businessesFilters = this.props.location.query;
    this.props.actions.fetchBusinesses(businessesFilters);
    this.props.actions.fetchFilterOptions();
  }

  handleTextSearchBusinesses(businessName) {
    const businessesFilters = this.props.location.query;
    this.props.actions.filterBusinessesByName(businessName, businessesFilters);
  }

  handleOnChangeFilterOptions(event) {
    event.preventDefault();
    const businessesFilters = this.props.location.query;
    const filterType = event.target.name;
    const filterValue = event.target.value;
    this.props.actions.filterBusinesses(
      filterType,
      filterValue,
      businessesFilters
    );
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
          <div>
            <Logo />
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
          <BusinessesView
            businesses={this.props.businesses}
            businessesMetadata={this.props.metadata}
            handleChangePage={this.handleChangePage.bind(this)}
            handleClickOnBusiness={this.handleClickOnBusiness.bind(this)}
          />
        </section>
      </MainLayout>
    );
  }
}

Businesses.propTypes = {
  actions: PropTypes.object,
  businesses: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  location: PropTypes.object,
  metadata: PropTypes.object.isRequired,
  params: PropTypes.object,
};

const mapStateToProps = _state => {
  const {businesses} = _state;
  return {
    businesses: businesses.businesses,
    filters: businesses.filters,
    metadata: businesses.metadata,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
