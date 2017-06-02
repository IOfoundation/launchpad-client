import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

import MainLayout from '../components/layouts/Main'
import HomeView from 'components/home/Main';

class Home extends Component {
  render() {
    return (
      <MainLayout>
        <section>
          <HomeView />
        </section>
      </MainLayout>
    );
  }
}

Home.propTypes = {};

const mapStateToProps = _state => {
  return {};
};

const mapDispatchToProps = _dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
