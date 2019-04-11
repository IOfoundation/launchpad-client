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
import Modal from './Events/Modal';

import * as eventActions from '@Actions/events';
import * as snackbarActions from '@Actions/snackbar';
import {htmlStripper, truncate, getDate} from '@Utils';

class Events extends PureComponent {
  state = {
    selectedEvent: {},
    openModal: false,
  };

  componentDidMount() {
    this.props.actions.getAllEventsAfter();
  }

  componentDidUpdate(prevProps) {
    const {errors, snackbar} = this.props;

    if (errors.errors !== prevProps.errors.errors) {
      if (errors.errors) {
        snackbar.showSnackbar({
          message: 'An error has ocurred',
        });
      }
    }
  }

  menuChanged = index => {
    this._tabSelected = this._tabOptions[index];
    if (this._tabSelected === this._tabOptions[0]) {
      this.props.actions.getAllEventsAfter();
    } else if (this._tabSelected === this._tabOptions[1]) {
      this.props.actions.getAllEventsBefore();
    }
  };

  handleChangePage = () => {};

  getEvents = () => {
    this.props.actions.getAllEventsBefore();
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

  handlerModalVisibility = modalInformation => {
    this.setState(prevState => {
      if (modalInformation) {
        const {rawEvents} = this.props;
        const selectedEvent = rawEvents.find(
          event => event.id === modalInformation.id
        );

        if (selectedEvent) {
          return {
            selectedEvent,
            openModal: !prevState.openModal,
          };
        }
      }

      return {
        openModal: !prevState.openModal,
      };
    });
  };

  _tabOptions = ['Upcoming', 'Past Events'];
  _tabSelected = 'Upcoming';

  render() {
    const {events, noResults, loading} = this.props;
    const {openModal, selectedEvent} = this.state;
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
      upcomingElements = (
        <Items
          disable={false}
          items={events}
          titleClicked={this.handlerModalVisibility}
          urlClicked={this.handlerModalVisibility}
        />
      );
      pastEventsElements = (
        <Items
          disable={true}
          items={events}
          titleClicked={this.handlerModalVisibility}
          urlClicked={this.handlerModalVisibility}
        />
      );
    }

    return (
      <LandingComponent navigation={true}>
        <Modal
          openModal={openModal}
          selectedEvent={selectedEvent}
          handlerModalVisibility={this.handlerModalVisibility}
        />
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
    rawEvents: events.data,
    events: eventsToItemsProps(events.data),
    noResults: events.data.length === 0,
    loading: events.loading,
    errors: events.errors,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(eventActions, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
  };
};

Events.propTypes = {
  actions: PropTypes.shape({
    getAllEvents: PropTypes.func,
    getAllEventsAfter: PropTypes.func,
    getAllEventsBefore: PropTypes.func,
  }),
  errors: PropTypes.shape({errors: PropTypes.bool}),
  events: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  noResults: PropTypes.bool,
  rawEvents: PropTypes.arrayOf(PropTypes.shape({})),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
