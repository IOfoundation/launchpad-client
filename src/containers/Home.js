import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MainLayout from '../components/layouts/Main';
import HomeView from '../components/home/Main';
import * as actions from '../actions/business';

export class Home extends Component {
  handleTextSearchResults(filter) {
    this.props.actions.fetchSearchResults(filter);
  }

  render() {
    return (
      <MainLayout>
        <section>
          <HomeView
            search_results={this.props.search_results}
            handleTextSearchResults={this.handleTextSearchResults.bind(
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
  search_results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = _state => {
  const {businesses} = _state;
  return {
    search_results: businesses.search_results,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
