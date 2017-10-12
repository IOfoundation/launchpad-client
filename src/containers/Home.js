import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MainLayout from '../components/layouts/Main';
import HomeView from '../components/home/Main';
import * as actions from '../actions/home';

export class Home extends Component {
  componentWillMount(_nextProps) {}

  handleClickOnServiceTag(service) {
    this.props.actions.filterBusinessesByService(service);
  }

  handleTextSearchBusinesses(filter) {
    this.props.actions.fetchServices(filter);
  }

  render() {
    return (
      <MainLayout>
        <section>
          <HomeView
            services={this.props.services}
            handleClickOnServiceTag={this.handleClickOnServiceTag.bind(this)}
            handleTextSearchBusinesses={this.handleTextSearchBusinesses.bind(
              this
            )}
          />
        </section>
      </MainLayout>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.object,
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
};

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
