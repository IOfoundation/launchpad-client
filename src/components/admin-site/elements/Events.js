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
import CloseModal from './Events/CloseModal';
import FormModal from './Events/FormModal';

import * as eventActions from '@Actions/events';
import * as snackbarActions from '@Actions/snackbar';
import * as eventsGetActions from '@Actions/events/get';
import * as eventDeleteActions from '@Actions/events/delete';
import {htmlStripper, truncate, getDate, getAuthorization} from '@Utils';
import itemMenuOptions from './Events/ItemMenuOptions';

class Events extends PureComponent {
  state = {
    selectedEvent: {},
    selectedEventId: '',
    openModal: false,
    deleteModal: false,
    openEditModal: false,
    mode: '',
  };

  componentDidMount() {
    const {actions, organizationId} = this.props;
    actions.getAllEventsAfter({
      page: 1,
      organizationId,
      ignoreOrgPublish: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {errors, snackbar, eventsGet} = this.props;
    const {mode} = this.state;

    if (errors.errors !== prevProps.errors.errors) {
      if (errors.errors) {
        snackbar.showSnackbar({
          message: 'An error has ocurred',
        });
      }
    }

    if (mode !== prevState.mode) {
      if (mode === 'new') {
        eventsGet.setLoading(false);
      }
    }
    this._deleteSuccess(prevProps);
    this._deleteError(prevProps);
  }

  _deleteSuccess = prevProps => {
    const {eventDeleteSuccess, snackbar} = this.props;

    if (eventDeleteSuccess !== prevProps.eventDeleteSuccess) {
      if (eventDeleteSuccess) {
        snackbar.showSnackbar({
          message: 'Event deleted succesfully',
        });
        this.handleChangePage(1);
      }
    }
  };

  _deleteError = prevProps => {
    const {eventDeleteError, snackbar} = this.props;

    if (eventDeleteError !== prevProps.eventDeleteError) {
      if (eventDeleteError) {
        snackbar.showSnackbar({
          message: 'There was a problem trying to delete the event',
        });
      }
    }
  };

  menuChanged = index => {
    this._tabSelected = this._tabOptions[index];
    this.handleChangePage(1);
  };

  handleChangePage = page => {
    const {actions, organizationId} = this.props;

    if (this._tabSelected === this._tabOptions[0]) {
      actions.getAllEventsAfter({
        page: 1,
        organizationId,
        ignoreOrgPublish: true,
      });
    } else if (this._tabSelected === this._tabOptions[1]) {
      actions.getAllEventsBefore({
        page,
        organizationId,
        ignoreOrgPublish: true,
      });
    }
  };

  _getPagination = (page, totalPages) => {
    return (
      <Pagination
        appliedFilters={{category: 'admin-events', page}}
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

  handlerEditModalVisibility = mode => {
    this.setState(prevState => {
      return {
        openEditModal: !prevState.openEditModal,
        mode,
      };
    });
  };

  handlerSubmenuOptions = (option, eventId) => {
    const {eventsGet} = this.props;

    if (option === itemMenuOptions.Edit) {
      eventsGet.get(eventId);
      this.handlerEditModalVisibility('edit');
    } else if (option === itemMenuOptions.Delete) {
      //eventDelete.remove({Authorization, eventId});
      this._eventId = eventId;
      this.handlerDeleteModalVisibility();
    }
  };

  handlerDeleteModalVisibility = () => {
    this.setState(prevState => {
      return {
        deleteModal: !prevState.deleteModal,
      };
    });
  };

  removeEvent = () => {
    const {eventDelete, Authorization} = this.props;

    eventDelete.remove({Authorization, eventId: this._eventId});
    this.handlerDeleteModalVisibility();
  };

  _tabOptions = ['Upcoming', 'Past Events'];
  _tabSelected = 'Upcoming';
  _eventId;

  render() {
    const {
      events,
      noResults,
      loading,
      totalPages,
      page,
      eventData,
      eventLoading,
    } = this.props;
    const {
      openModal,
      selectedEvent,
      openEditModal,
      mode,
      deleteModal,
    } = this.state;
    let upcomingElements = <Loading />;
    let pastEventsElements = <Loading />;
    let pagination = null;

    if (noResults && !loading) {
      upcomingElements = (
        <p className="text-regular paragraph">{'No events available.'}</p>
      );
      pastEventsElements = (
        <p className="text-regular paragraph">{'No events available.'}</p>
      );
    } else if (events.length > 0 && !loading) {
      upcomingElements = (
        <Items
          disable={false}
          items={events}
          titleClicked={this.handlerModalVisibility}
          urlClicked={this.handlerModalVisibility}
          optionSelected={this.handlerSubmenuOptions}
        />
      );
      pastEventsElements = (
        <Items
          disable={true}
          items={events}
          titleClicked={this.handlerModalVisibility}
          urlClicked={this.handlerModalVisibility}
          optionSelected={this.handlerSubmenuOptions}
        />
      );
      pagination = this._getPagination(page, totalPages);
    }

    return (
      <LandingComponent navigation={true}>
        <Modal
          openModal={openModal}
          selectedEvent={selectedEvent}
          handlerModalVisibility={this.handlerModalVisibility}
        />
        <CloseModal
          open={deleteModal}
          handlerModalVisibility={this.handlerDeleteModalVisibility}
          deleteClicked={this.removeEvent}
          cancelClicked={this.handlerDeleteModalVisibility}
        />
        <FormModal
          openModal={openEditModal}
          handlerModalVisibility={() => this.handlerEditModalVisibility('')}
          refreshData={this.handleChangePage}
          selectedEvent={eventData}
          dataLoading={eventLoading}
          mode={mode}
        />
        <Title
          titleText="Your Events"
          hideCancelAction={true}
          submitLabel="Create an Event"
          submitClicked={() => this.handlerEditModalVisibility('new')}
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
    const date = event.posted_at && getDate(event.posted_at);
    const start = event.starting_at && getDate(event.starting_at);
    let description = event.body && htmlStripper(event.body);
    let title = event.title;

    if (description && description.split('').length > 190) {
      description = truncate(description, 190);
    }

    if (title && title.split('').length > 130) {
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
  const organizationId =
    _state.user.organizationId || sessionStorage.getItem('organizationId');
  const Authorization = getAuthorization(_state);

  return {
    Authorization,
    rawEvents: events.data,
    events: eventsToItemsProps(events.data),
    noResults: events.data.length === 0,
    page: events.page,
    totalPages: events.totalPages,
    loading: events.loading,
    errors: events.errors,
    organizationId,
    eventSucces: _state.eventsGet.success,
    eventLoading: _state.eventsGet.loading,
    eventError: _state.eventsGet.error,
    eventErrors: _state.eventsGet.errors,
    eventData: _state.eventsGet.data,
    eventDeleteSuccess: _state.eventDelete.success,
    eventDeleteError: _state.eventDelete.error,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(eventActions, _dispatch),
    snackbar: bindActionCreators(snackbarActions, _dispatch),
    eventsGet: bindActionCreators(eventsGetActions, _dispatch),
    eventDelete: bindActionCreators(eventDeleteActions, _dispatch),
  };
};

Events.propTypes = {
  actions: PropTypes.shape({
    getAllEvents: PropTypes.func,
    getAllEventsAfter: PropTypes.func,
    getAllEventsBefore: PropTypes.func,
  }),
  Authorization: PropTypes.string,
  errors: PropTypes.shape({errors: PropTypes.bool}),
  eventData: PropTypes.shape({}),
  eventDelete: PropTypes.shape({
    remove: PropTypes.func,
  }),
  eventDeleteError: PropTypes.bool,
  eventDeleteSuccess: PropTypes.bool,
  eventError: PropTypes.bool,
  eventErrors: PropTypes.arrayOf(PropTypes.shape({})),
  eventLoading: PropTypes.bool,
  events: PropTypes.arrayOf(PropTypes.shape({})),
  eventsGet: PropTypes.shape({
    get: PropTypes.func,
    setLoading: PropTypes.func,
  }),
  eventSucces: PropTypes.bool,
  loading: PropTypes.bool,
  noResults: PropTypes.bool,
  organizationId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rawEvents: PropTypes.arrayOf(PropTypes.shape({})),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
  totalPages: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
