import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MainLayout from '../components/layouts/Main';
import HomeView from '../components/home/Main';
import * as actions from '../actions/business';

export class Home extends Component {
  getTextSearchResults(filter) {
    this.props.actions.fetchSearchResults(filter);
  }

  render() {
    return (
      <MainLayout>
        <section>
          <HomeView
            items={this.props.items}
            getTextSearchResults={(e) => this.getTextSearchResults(e)}
          />
        </section>
      </MainLayout>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.object,
};

const mapStateToProps = _state => {
  const {businesses} = _state;
  return {
    items: businesses.items,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
