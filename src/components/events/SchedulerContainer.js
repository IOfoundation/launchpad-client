import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Scheduler} from '@progress/kendo-scheduler-react-wrapper';
import '@progress/kendo-ui';
import {withStyles} from '@material-ui/core/styles';
import {containerStyles} from '../../utils';
import {PropTypes} from 'prop-types';
import * as actions from '../../actions/events';

const styles = theme => ({
  container: {
    padding: 12,
    ...containerStyles(theme),
  },
});

class SchedulerContainer extends PureComponent {
  state = {
    date: new Date(),
    views: ['day', 'week', {type: 'month', selected: true}],
    events: [],
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

    console.log(modalInformation);
  };

  render() {
    const {classes, breakpoint} = this.props;
    const {startTime, views, events} = this.state;

    return (
      <div className={classes.container}>
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
  }),
  events: PropTypes.arrayOf(PropTypes.shape({})),
};

export default withStyles(styles)(
  connect(
    mapPropsToState,
    mapDispatchToProps
  )(SchedulerContainer)
);
