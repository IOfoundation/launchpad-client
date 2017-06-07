import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MainLayout from '../components/layouts/Main';
import Logo from '../components/shared/Logo';
import FilterBox from '../components/filters/FilterBox';
import BusinessesView from 'components/businesses/Main';
import * as actions from '../actions/business';

export class Businesses extends Component {
  componentWillMount(_nextProps) {
    const businessesFilters = this.props.location.query;
    this.props.actions.fetchBusinesses(businessesFilters);
  }

  handleTextSearchBusinesses(businessName){
    let businessesFilters = this.props.location.query;
    this.props.actions.filterBusinessesByName(businessName, businessesFilters);
  }

  render() {
    return (
      <MainLayout>
        <section>
          <div>
            <Logo />
            <FilterBox
              handleTextSearchBusinesses={this.handleTextSearchBusinesses.bind(this)}
            />
          </div>
          <BusinessesView businesses={this.props.businesses} />
        </section>
      </MainLayout>
    );
  }
}

const mapStateToProps = _state => {
  const {businesses} = _state;
  return {
    businesses: businesses.businesses,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
