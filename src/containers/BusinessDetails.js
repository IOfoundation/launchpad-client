import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {PropTypes} from 'prop-types';

import MainLayout from '../components/layouts/Main';
import BusinessDetailsContent from '../components/businesses/BusinessDetails';

import * as business from '@Actions/business';
import * as events from '@Actions/events';
import {sizeCheck, viewport} from '@Utils';
import * as blogs from '@Actions/blogs';

class BusinessDetails extends PureComponent {
  state = {
    breakpoint: '',
    homePage: false,
    listener: () => sizeCheck(this.handleWindowSizeChange),
    width: viewport().width,
  };

  componentDidMount() {
    this.props.business.fetchOrganizationById(this.props.params.id);
    this.props.events.getAllEventsAfter({
      page: 1,
      organizationId: this.props.params.id,
      perPage: 200,
    });
    this.props.blogs.getFeaturedPostById(this.props.params.id);
    window.addEventListener('resize', this.state.listener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.listener);
  }

  handleWindowSizeChange = breakpoint => {
    this.setState({breakpoint, width: viewport().width});
  };

  render() {
    const {width, homePage, breakpoint} = this.state;
    const {organization, eventsData} = this.props;

    return (
      <MainLayout windowWidth={width} homePage={homePage}>
        <BusinessDetailsContent
          organization={organization}
          events={eventsData}
          breakpoint={breakpoint}
        />
      </MainLayout>
    );
  }
}

BusinessDetails.propTypes = {
  blogs: PropTypes.shape({
    getFeaturedPostById: PropTypes.func.isRequired,
  }),
  business: PropTypes.shape({
    fetchOrganizationById: PropTypes.func.isRequired,
  }),
  events: PropTypes.shape({
    getAllEvents: PropTypes.func.isRequired,
    getAllEventsAfter: PropTypes.func.isRequired,
  }),
  eventsData: PropTypes.arrayOf(PropTypes.shape({})),
  organization: PropTypes.shape({}),
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};

const mapStateToProps = _state => {
  const {businesses, events: _events} = _state;

  return {
    organization: businesses.organization,
    eventsData: _events.events.data,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    business: bindActionCreators(business, _dispatch),
    events: bindActionCreators(events, _dispatch),
    blogs: bindActionCreators(blogs, _dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BusinessDetails));
