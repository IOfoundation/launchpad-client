import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

import Layout from 'components/home/Layout';

class Home extends Component {
  render() {
    return <Layout />;
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
