import React, {PureComponent} from 'react';
import '@progress/kendo-ui';
import '@progress/kendo-ui/js/kendo.timezones';
import {PropTypes} from 'prop-types';
import {Scheduler} from '@progress/kendo-scheduler-react-wrapper';
import {withStyles} from '@material-ui/core/styles';
import kendo from '@progress/kendo-ui';

import {containerStyles, getDate, mobileDaysMap} from '@Utils';

const styles = theme => ({
  container: {
    padding: 12,
    ...containerStyles(theme),
  },
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

class SchedulerContainer extends PureComponent {
  state = {
    views: ['day', 'week', {type: 'month', selected: true}],
    events: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.events.data &&
      nextProps.events.data.length !== prevState.events.length
    ) {
      const mappedEvents = nextProps.events.data.map(event => {
        const start = getDate(event.starting_at);
        const end = getDate(event.ending_at);
        const mapped = {
          ID: event.id,
          title: event.title,
          start: new Date(start.pacificTime),
          end: new Date(end.pacificTime),
          description: event.body,
          recurrenceId: event.organization_id,
        };

        if (event.is_all_day) {
          mapped.isAllDay = event.is_all_day;
        }

        return mapped;
      });

      return {events: mappedEvents};
    }

    return null;
  }

  componentDidMount() {
    this.props.actions.getAllEventsByMonth(this._date.monthNumeric);
    this._schedulerRef.widgetInstance.element[0].addEventListener(
      'click',
      this._schedulerClicked
    );
  }

  componentDidUpdate(prevProps) {
    const {data: nextEvents, loading: nextLoading} = this.props.events;
    const {data: currentEvents, loading: prevLoading} = prevProps.events;

    if (
      this._thereIsNoEventsAndIsNotLoading(
        nextEvents,
        currentEvents,
        nextLoading,
        prevLoading
      )
    ) {
      this.setLoadingStatusOnScheduler(false);
    }
  }

  componentWillUnmount() {
    this._schedulerRef.widgetInstance.element[0].removeEventListener(
      'click',
      this._schedulerClicked
    );
  }

  _schedulerRef = null;
  _schedulerClicked = event => {
    const className = event.target.className;

    if (className === 'k-event-template') {
      this.openModal(event.target.textContent);
    }
  };
  _thereIsNoEventsAndIsNotLoading = (
    nextEvents,
    currentEvents,
    nextLoading,
    prevLoading
  ) => {
    return (
      nextEvents.length === currentEvents.length &&
      nextEvents.length === 0 &&
      nextLoading !== prevLoading &&
      !nextLoading
    );
  };
  _changeName = true;
  _date = getDate();
  _month = this._date.monthNumeric;

  openModal = text => {
    const modalInformation = this.props.events.data.find(
      _event => _event.title === text
    );

    this.props.handlerModalVisibility(modalInformation);
  };

  updateCalendar = event => {
    const pickedDate = getDate(event.sender._model.selectedDate);
    const monthNumeric = pickedDate.date.toLocaleString('en-US', {
      month: 'numeric',
    });

    if (event.sender._selectedViewName === 'week' && this._changeName) {
      const weekDate = this._schedulerRef.widgetInstance.element[0].querySelectorAll(
        '.k-scheduler-header .k-nav-day'
      );

      weekDate.forEach(date => {
        const parse = date.textContent.split(' ');

        date.textContent = `${mobileDaysMap[parse[0]]} ${parse[1]}`;
      });
      this._changeName = false;
    } else if (event.sender._selectedViewName !== 'week') {
      this._changeName = true;
    }

    if (monthNumeric !== this._month) {
      this.setLoadingStatusOnScheduler(true);
      this._month = monthNumeric;
      this.props.actions.getAllEventsByMonth(monthNumeric);
    }
  };

  handlerDataBinding = event => {
    if (event.action === 'rebind' && event.items.length > 0) {
      this.setLoadingStatusOnScheduler(false);
    } else {
      this.setLoadingStatusOnScheduler(true);
    }
  };

  setLoadingStatusOnScheduler = value => {
    const scheduler = this._schedulerRef.widgetInstance.element.getKendoScheduler();
    kendo.ui.progress(scheduler.element.find('.k-scheduler-content'), value);
  };

  render() {
    const {classes, breakpoint} = this.props;
    const {startTime, views, events} = this.state;

    return (
      <div className={classes.container}>
        <Scheduler
          height={660}
          views={views}
          dataSource={events}
          date={this._date.date}
          startTime={startTime}
          mobile={breakpoint === 'xs'}
          editable={false}
          ref={_ref => {
            this._schedulerRef = _ref;
          }}
          dataBound={event => this.updateCalendar(event)}
          dataBinding={event => this.handlerDataBinding(event)}
        />
      </div>
    );
  }
}

SchedulerContainer.propTypes = {
  actions: PropTypes.shape({
    getAllEventsByMonth: PropTypes.func,
  }),
  breakpoint: PropTypes.string,
  classes: PropTypes.shape({
    container: PropTypes.string,
    paper: PropTypes.string,
  }),
  events: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    errors: PropTypes.shape({}),
    loading: PropTypes.bool,
  }),
  handlerModalVisibility: PropTypes.func,
};

export default withStyles(styles)(SchedulerContainer);
