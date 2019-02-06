import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MainLayout from '../components/layouts/Main';
import HomeView from '../components/home/Main';
import * as actions from '../actions/business';
import * as snackbarActions from '../actions/snackbar';
import SnackbarUI from '../components/shared/SnackBar';

export class Home extends Component {
  state = {
    width: window.innerWidth,
    homePage: true,
  };

  componentWillMount(_nextProps) {
    window.addEventListener('resize', () => this.handleWindowSizeChange());
  }

  componentDidMount() {
    this.props.snackbar.testingSnackbar({
      message: 'This is a test',
    });
  }

  getTextSearchResults(filter) {
    this.props.actions.fetchSearchResults(filter);
  }

  componentWillUnMount() {
    window.addEventListener('resize', () => this.handleWindowSizeChange());
  }

  handleWindowSizeChange = () => {
    this.setState({width: window.innerWidth});
  };

  render() {
    return (
      <MainLayout windowWidth={this.state.width} homePage={this.state.homePage}>
        <section>
          <HomeView
            items={this.props.items}
            getTextSearchResults={e => this.getTextSearchResults(e)}
          />
          <SnackbarUI />
        </section>
      </MainLayout>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.shape({
    fetchSearchResults: PropTypes.func.isRequired,
  }),
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.shape({}),
  snackbar: PropTypes.shape({
    testingSnackbar: PropTypes.func.isRequired,
  }),
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
    snackbar: bindActionCreators(snackbarActions, _dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
