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

    setTimeout(() => {
      this.props.snackbarActions.showSnackbar();
    }, 2000);
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
          <SnackbarUI
            open={this.props.snackbarVisibility}
            handleActionClick={() => {
              this.props.snackbarActions.hideSnackbar();
            }}
            handleRequestClose={() => {
              this.props.snackbarActions.hideSnackbar();
            }}
            message="message"
            autoHideDuration={10000}
            action="action"
          />
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
  snackbarActions: PropTypes.shape({
    showSnackbar: PropTypes.func.isRequired,
    hideSnackbar: PropTypes.func.isRequired,
  }),
  snackbarVisibility: PropTypes.bool,
};

const mapStateToProps = _state => {
  const {businesses, snackbar} = _state;

  return {
    items: businesses.items,
    snackbarVisibility: snackbar.visibility,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
    snackbarActions: bindActionCreators(snackbarActions, _dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
