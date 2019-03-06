import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Scheduler} from '@progress/kendo-scheduler-react-wrapper';
import '@progress/kendo-ui';
import {withStyles} from '@material-ui/core/styles';
import {containerStyles} from '../../utils';
import {PropTypes} from 'prop-types';
import * as actions from '../../actions/events';
import Content from './Modal/Content';
import Modal from '@material-ui/core/Modal';

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
  },
});

class SchedulerContainer extends PureComponent {
  state = {
    date: new Date(),
    views: ['day', 'week', {type: 'month', selected: true}],
    events: [],
    selectedEvent: {},
    openModal: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.events.length !== prevState.events.length) {
      const mappedEvents = nextProps.events.map(event => {
        return {
          ID: event.id,
          title: event.title,
          start: event.starting_at,
          end: event.ending_at,
          description: event.body,
          recurrenceId: event.organization_id,
        };
      });
      return {events: mappedEvents};
    }
    return null;
  }

  componentDidMount() {
    this.props.actions.getAllEvents();
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
          height={600}
          views={views}
          dataSource={events}
          date={this.state.date}
          startTime={startTime}
          mobile={breakpoint === 'xs'}
          editable={false}
          ref={_ref => {
            this._schedulerRef = _ref;
          }}
        />
      </div>
    );
  }
}

const mapPropsToState = _state => {
  return {
    events: _state.events.data,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

SchedulerContainer.propTypes = {
  actions: PropTypes.shape({
    getAllEvents: PropTypes.func,
  }),
  breakpoint: PropTypes.string,
  classes: PropTypes.shape({
    container: PropTypes.string,
    paper: PropTypes.string,
  }),
  events: PropTypes.arrayOf(PropTypes.shape({})),
};

export default withStyles(styles)(
  connect(
    mapPropsToState,
    mapDispatchToProps
  )(SchedulerContainer)
);
