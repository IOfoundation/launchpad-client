import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LandingComponent from '../Landing';
import Title from '../Title';
import Items from './Events/Items';
import Pagination from '../../businesses/Pagination';
import CustomTabs from '@Shared/Tabs';
import Loading from '@Shared/Loading';

import * as eventActions from '@Actions/events';
import {htmlStripper, truncate, getDate} from '@Utils';

class Events extends PureComponent {
  componentDidMount() {
    this.getEvents();
  }

  menuChanged = index => {
    this._tabSelected = this._tabOptions[index];
  };

  handleChangePage = () => {};

  getEvents = () => {
    this.props.actions.getAllEvents();
  };

  _getPagination = (page, totalPages) => {
    return (
      <Pagination
        appliedFilters={{category: 'admin-posts', page}}
        handleChangePage={this.handleChangePage}
        metadata={{
          pagination: {
            last: {
              page: totalPages,
            },
            currentPage: page,
          },
          totalOrganization: String(totalPages),
        }}
        noMargin={true}
      />
    );
  };

  _tabOptions = ['Upcoming', 'Past Events'];
  _tabSelected = 'Upcoming';

  render() {
    const {events, noResults, loading} = this.props;
    let upcomingElements = <Loading />;
    let pastEventsElements = <Loading />;
    const pagination = null;

    if (noResults && !loading) {
      upcomingElements = (
        <p className="text-regular paragraph">{'No posts available.'}</p>
      );
      pastEventsElements = (
        <p className="text-regular paragraph">{'No posts available.'}</p>
      );
    } else if (events.length > 0 && !loading) {
      upcomingElements = <Items items={events} disable={false} />;
      pastEventsElements = <Items items={events} disable={true} />;
    }

    return (
      <LandingComponent navigation={true}>
        <Title
          titleText="Your Events"
          hideCancelAction={true}
          submitLabel="Create an Event"
        />
        <CustomTabs tabs={this._tabOptions} changed={this.menuChanged}>
          {upcomingElements}
          {pastEventsElements}
        </CustomTabs>
        {pagination}
      </LandingComponent>
    );
  }
}

function eventsToItemsProps(events) {
  return events.map(event => {
    const date = getDate(event.posted_at);
    const start = getDate(event.starting_at);
    let description = htmlStripper(event.body);
    let title = event.title;

    if (description.split('').length > 190) {
      description = truncate(description, 190);
    }

    if (title.split('').length > 130) {
      title = truncate(title, 130);
    }

    return {
      id: event.id,
      title,
      description,
      label: 'Posted:',
      date: `${date.monthLarge} ${date.dayNumber}, ${date.year}`,
      start: `${start.monthLarge} ${start.dayNumber}, ${start.year}`,
      category: '',
      url: event.external_url,
    };
  });
}

const mapStateToProps = _state => {
  const {events} = _state.events;
  return {
    events: eventsToItemsProps(events.data),
    noResults: events.data.length === 0,
    loading: events.loading,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(eventActions, _dispatch),
  };
};

Events.propTypes = {
  actions: PropTypes.shape({
    getAllEvents: PropTypes.func,
  }),
  events: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  noResults: PropTypes.bool,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
