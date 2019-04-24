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
import FormModal from './Events/FormModal';

import * as eventActions from '@Actions/events';
import * as snackbarActions from '@Actions/snackbar';
import {htmlStripper, truncate, getDate} from '@Utils';
import itemMenuOptions from './Events/ItemMenuOptions';

class Events extends PureComponent {
  state = {
    selectedEvent: {},
    openModal: false,
    openEditModal: false,
  };

  componentDidMount() {
    const {actions, organizationId} = this.props;

    actions.getAllEventsAfter(1, organizationId);
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
    this.handleChangePage(1);
  };

  handleChangePage = page => {
    const {actions, organizationId} = this.props;

    if (this._tabSelected === this._tabOptions[0]) {
      actions.getAllEventsAfter(page, organizationId);
    } else if (this._tabSelected === this._tabOptions[1]) {
      actions.getAllEventsBefore(page, organizationId);
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

  handlerEditModalVisibility = () => {
    this.setState(prevState => {
      return {
        openEditModal: !prevState.openEditModal,
      };
    });
  };

  handlerSubmenuOptions = option => {
    if (option === itemMenuOptions.Edit) {
      this.handlerEditModalVisibility();
    }
  };

  _tabOptions = ['Upcoming', 'Past Events'];
  _tabSelected = 'Upcoming';

  render() {
    const {events, noResults, loading, totalPages, page} = this.props;
    const {openModal, selectedEvent, openEditModal} = this.state;
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
        <FormModal
          openModal={openEditModal}
          handlerModalVisibility={this.handlerEditModalVisibility}
          refreshData={this.handleChangePage}
        />
        <Title
          titleText="Your Events"
          hideCancelAction={true}
          submitLabel="Create an Event"
          submitClicked={this.handlerEditModalVisibility}
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

  return {
    rawEvents: events.data,
    events: eventsToItemsProps(events.data),
    noResults: events.data.length === 0,
    page: events.page,
    totalPages: events.totalPages,
    loading: events.loading,
    errors: events.errors,
    organizationId,
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
  organizationId: PropTypes.string,
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
