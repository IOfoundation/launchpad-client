import React, {PureComponent} from 'react';
import MainLayout from '../components/layouts/Main';
import BusinessDetailsContent from '../components/businesses/BusinessDetails';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import * as actions from '../actions/business';
import {viewport, sizeCheck} from '../utils';

import {PropTypes} from 'prop-types';

class BusinessDetails extends PureComponent {
  state = {
    width: viewport().width,
    breakpoint: '',
    homePage: false,
    istener: () => sizeCheck(this.handleWindowSizeChange),
  };

  componentDidMount() {
    this.props.actions.fetchOrganizationById(this.props.params.id);
    window.addEventListener('resize', this.state.listener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.listener);
  }

  handleWindowSizeChange = breakpoint => {
    this.setState({breakpoint, width: viewport().width});
  };

  render() {
    const {width, homePage} = this.state;

    return (
      <MainLayout windowWidth={width} homePage={homePage}>
        <BusinessDetailsContent organization={this.props.organization} />
      </MainLayout>
    );
  }
}

BusinessDetails.propTypes = {
  actions: PropTypes.shape({
    fetchOrganizationById: PropTypes.func.isRequired,
  }),
  organization: PropTypes.shape({}),
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};

const mapStateToProps = _state => {
  const {businesses} = _state;

  return {
    organization: businesses.organization,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BusinessDetails));
