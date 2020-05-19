import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import Content from './Modal/Content';
import Jumbotron from './Jumbotron';
import FeaturedEvents from './FeaturedEvents/FeaturedEvents';
import SchedulerContainer from './SchedulerContainer';
import Loading from '@Shared/Loading';

import * as eventActions from '@Actions/events';
import {getDate} from '@Utils';

class Events extends PureComponent {
  state = {
    selectedEvent: {},
    openModal: false,
  };

  componentDidMount() {
    const monthsNumber = getDate().nextThreeMonths.map(month => month.number);

    this.props.actions.getAllEventsByMonth(this._date.monthNumeric);
    this.props.actions.getEventsByMonth(monthsNumber, 'featured');
  }

  componentWillUnmount() {
    this.props.actions.reset();
  }

  _date = getDate();
  _loaded = false;

  handlerModalVisibility = modalInformation => {
    this.setState(prevState => {
      if (modalInformation) {
        return {
          selectedEvent: modalInformation,
          openModal: !prevState.openModal,
        };
      }

      return {
        openModal: !prevState.openModal,
      };
    });
  };

  render() {
    const {
      breakpoint,
      actions,
      featuredEvents,
      eventsByMonth,
      classes,
    } = this.props;
    const {openModal, selectedEvent} = this.state;
    const {street_1, street_2, state_abbr, city, zip} = selectedEvent;
    let address;
    let scheduler = <Loading />;

    if (street_2) {
      address = `${street_1}, ${street_2}, ${city}, ${state_abbr}, ${zip}`;
    } else {
      address = `${street_1}, ${city}, ${state_abbr}, ${zip}`;
    }

    if (!eventsByMonth.loading || this._loaded) {
      scheduler = (
        <SchedulerContainer
          currentDate={this._date}
          actions={actions}
          breakpoint={breakpoint}
          events={eventsByMonth}
          handlerModalVisibility={this.handlerModalVisibility}
        />
      );
      this._loaded = true;
    }

    return (
      <div className="events-container">
        <Modal open={openModal} onClose={this.handlerModalVisibility}>
          <div className={classes.paper}>
            <Content
              title={selectedEvent.title}
              postedBy={selectedEvent.organization}
              start={selectedEvent.starting_at}
              end={selectedEvent.ending_at}
              address={address}
              link={selectedEvent.external_url}
              description={selectedEvent.body}
              closed={this.handlerModalVisibility}
            />
          </div>
        </Modal>
        <Jumbotron />
        <FeaturedEvents
          featuredEvents={featuredEvents}
          handlerModalVisibility={this.handlerModalVisibility}
        />
        {scheduler}
      </div>
    );
  }
}

const mapPropsToState = _state => {
  return {
    eventsByMonth: _state.events.eventsByMonth,
    featuredEvents: _state.events.featuredEvents,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(eventActions, _dispatch),
  };
};

const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    left: '50%',
    maxHeight: '70vh',
    outline: 'none',
    overflow: 'auto',
    padding: '32px 24px',
    position: 'absolute',
    top: '45%',
    transform: 'translate(-50%, -50%)',
    width: theme.spacing.unit * 70,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      boxSizing: 'border-box',
    },
  },
});

Events.propTypes = {
  actions: PropTypes.shape({
    getEventsByMonth: PropTypes.func,
    getAllEventsByMonth: PropTypes.func,
    reset: PropTypes.func,
  }),
  breakpoint: PropTypes.string,
  classes: PropTypes.shape({
    paper: PropTypes.string,
  }),
  eventsByMonth: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    errors: PropTypes.shape({}),
    loading: PropTypes.bool,
  }),
  featuredEvents: PropTypes.shape({
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({})),
      PropTypes.arrayOf(PropTypes.array),
    ]),
    errors: PropTypes.shape({}),
    loading: PropTypes.bool,
  }),
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withStyles(styles)(Events));
