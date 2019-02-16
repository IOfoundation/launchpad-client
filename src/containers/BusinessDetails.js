import React, {PureComponent} from 'react';
import MainLayout from '../components/layouts/Main';
import BusinessDetailsContent from '../components/businesses/BusinessDetails';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import * as business from '../actions/business';
import * as events from '../actions/events';
import {sizeCheck, viewport} from '../utils';
import * as blogs from '../actions/blogs';

import {PropTypes} from 'prop-types';

class BusinessDetails extends PureComponent {
  state = {
    width: viewport().width,
    breakpoint: '',
    homePage: false,
    istener: () => sizeCheck(this.handleWindowSizeChange),
  };

  componentDidMount() {
    this.props.business.fetchOrganizationById(this.props.params.id);
    this.props.events.getAllEventsById(this.props.params.id);
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
    const {posts} = this.props;
    const {width, homePage} = this.state;
    const {organization, eventsData} = this.props;

    return (
      <MainLayout windowWidth={width} homePage={homePage}>
        <BusinessDetailsContent
          organization={organization}
          events={eventsData}
          posts={posts}
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
    getAllEventsById: PropTypes.func.isRequired,
  }),
  eventsData: PropTypes.arrayOf(PropTypes.shape({})),
  organization: PropTypes.shape({}),
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
  posts: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = _state => {
  const {businesses, events: _events, blogs: _blogs} = _state;

  return {
    organization: businesses.organization,
    eventsData: _events.data,
    posts: _blogs.organizationPosts,
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
