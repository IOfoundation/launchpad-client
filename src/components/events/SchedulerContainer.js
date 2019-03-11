import React, {PureComponent} from 'react';
import {Scheduler} from '@progress/kendo-scheduler-react-wrapper';
import {withStyles} from '@material-ui/core/styles';
import {containerStyles, getDate, mobileDaysMap} from '../../utils';
import {PropTypes} from 'prop-types';
import Content from './Modal/Content';
import Modal from '@material-ui/core/Modal';
import '@progress/kendo-ui';
import kendo from '@progress/kendo-ui';
import '@progress/kendo-ui/js/kendo.timezones';

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
    selectedEvent: {},
    openModal: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.events &&
      nextProps.events.length !== prevState.events.length
    ) {
      const mappedEvents = nextProps.events.map(event => {
        const start = getDate(event.starting_at);
        const end = getDate(event.ending_at);

        return {
          ID: event.id,
          title: event.title,
          start: new Date(start.pacificTime),
          end: new Date(end.pacificTime),
          description: event.body,
          recurrenceId: event.organization_id,
        };
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
  _changeName = true;
  _date = getDate();
  _month = this._date.monthNumeric;

  openModal = text => {
    const modalInformation = this.props.events.find(
      _event => _event.title === text
    );

    this.handlerModalVisibility(modalInformation);
  };

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

  updateCalendar = e => {
    const pickedDate = getDate(e.sender._model.selectedDate);
    const monthNumeric = pickedDate.date.toLocaleString('en-US', {
      month: 'numeric',
    });

    if (e.sender._selectedViewName === 'week' && this._changeName) {
      const weekDate = this._schedulerRef.widgetInstance.element[0].querySelectorAll(
        '.k-scheduler-header .k-nav-day'
      );

      weekDate.forEach(date => {
        const parse = date.textContent.split(' ');

        date.textContent = `${mobileDaysMap[parse[0]]} ${parse[1]}`;
      });
      this._changeName = false;
    } else if (e.sender._selectedViewName !== 'week') {
      this._changeName = true;
    }

    if (monthNumeric !== this._month) {
      this.setLoadingStatusOnScheduler(true);
      this._month = monthNumeric;
      this.props.actions.getAllEventsByMonth(monthNumeric);
    }
  };

  handlerDataBinding = e => {
    if (e.action === 'rebind' && e.items.length > 0) {
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
    const {startTime, views, events, openModal, selectedEvent} = this.state;

    return (
      <div className={classes.container}>
        <Modal open={openModal} onClose={this.handlerModalVisibility}>
          <div className={classes.paper}>
            <Content
              title={selectedEvent.title}
              postedBy={selectedEvent.organization}
              start={selectedEvent.starting_at}
              end={selectedEvent.ending_at}
              address={`${selectedEvent.street_1}, ${selectedEvent.street_2}, ${
                selectedEvent.state_abbr
              }, ${selectedEvent.zip}`}
              link={selectedEvent.external_url}
              description={selectedEvent.body}
              closed={this.handlerModalVisibility}
            />
          </div>
        </Modal>
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
          dataBound={e => this.updateCalendar(e)}
          dataBinding={e => this.handlerDataBinding(e)}
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
  events: PropTypes.arrayOf(PropTypes.shape({})),
};

export default withStyles(styles)(SchedulerContainer);
