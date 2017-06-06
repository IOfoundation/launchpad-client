import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MainLayout from '../components/layouts/Main';
import HomeView from '../components/home/Main';
import * as actions from '../actions/home';

export class Home extends Component {
  componentWillMount(_nextProps) {
    this.props.actions.fetchServices();
  }

  handleClickOnServiceTag(service){
    this.props.actions.filterBusinessesByService(service);
  }

  handleSubmitSearchBusinessesForm(businessName){
    this.props.actions.filterBusinessesByName(businessName);
  }

  render() {
    return (
      <MainLayout>
        <section>
          <HomeView
            services={this.props.services}
            handleClickOnServiceTag={this.handleClickOnServiceTag.bind(this)}
            handleSubmitSearchBusinessesForm={this.handleSubmitSearchBusinessesForm.bind(this)} />
        </section>
      </MainLayout>
    );
  }
}

Home.propTypes = {};

const mapStateToProps = _state => {
  const {home} = _state;
  return {
    services: home.services,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
