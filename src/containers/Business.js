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
    const businessId = this.props.params.id;
    this.props.actions.fetchBusiness(businessId);
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

  render() {
    const businessEx = {
      name: 'Business name',
      logo: '../static-data/images/test-logo.png',
      address: '1456 Summerdale Rd',
      city: 'corvallis',
      country_code: '1',
      zip_code: '59828',
      phone: '555-5555-5555',
      email: 'asdf@asdff.com',
      description: 'Alphapointe is a diverse company that includes office supply stores, Call Center Services, plastics, office products, janitorial products, and textile manufacturing, and Low Vision Services.  It also offers more than 50,000 office supply products to businesses in the Kansas City area and nationally at www.alphapointeonline.com . Formed as a 501(c)(3) not-for-profit in 1911, Alphapointe is the largest employer of the blind in the state of Missouri.  It operates nine facilities in four states. The organization provides jobs and services to those who have lost sight.',
      Services: ['service1', 'Services2'],
      Stages: ['stages'],
      Communities: ['Communities'],
    };
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
          <BusinessView business={businessEx} />
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
