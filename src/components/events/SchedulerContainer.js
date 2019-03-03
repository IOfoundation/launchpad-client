import React, {PureComponent} from 'react';
import {Scheduler} from '@progress/kendo-scheduler-react-wrapper';
import kendo from '@progress/kendo-ui';
import {withStyles} from '@material-ui/core/styles';
import {containerStyles} from '../../utils';
import {PropTypes} from 'prop-types';

const styles = theme => ({
  container: {
    padding: 12,
    ...containerStyles(theme),
  },
});

class SchedulerContainer extends PureComponent {
  state = {
    date: new Date('2013/6/13'),
    resiurces: [
      {
        field: 'ownerId',
        title: 'Owner',
        dataSource: [
          {text: 'Alex', value: 1, color: '#f8a398'},
          {text: 'Bob', value: 2, color: '#51a0ed'},
          {text: 'Charlie', value: 3, color: '#56ca85'},
        ],
      },
    ],
    views: [
      'day',
      {type: 'workWeek', selected: true},
      'week',
      'month',
      'agenda',
      {type: 'timeline', eventHeight: 50},
    ],
    dataSource: {
      batch: true,
      transport: {
        read: {
          url: 'https://demos.telerik.com/kendo-ui/service/tasks',
          dataType: 'jsonp',
        },
        update: {
          url: 'https://demos.telerik.com/kendo-ui/service/tasks/update',
          dataType: 'jsonp',
        },
        create: {
          url: 'https://demos.telerik.com/kendo-ui/service/tasks/create',
          dataType: 'jsonp',
        },
        destroy: {
          url: 'https://demos.telerik.com/kendo-ui/service/tasks/destroy',
          dataType: 'jsonp',
        },
        parameterMap(options, operation) {
          if (operation !== 'read' && options.models) {
            return {models: kendo.stringify(options.models)};
          }
        },
      },
      schema: {
        model: {
          id: 'taskId',
          fields: {
            taskId: {from: 'TaskID', type: 'number'},
            title: {
              from: 'Title',
              defaultValue: 'No title',
              validation: {required: true},
            },
            start: {type: 'date', from: 'Start'},
            end: {type: 'date', from: 'End'},
            startTimezone: {from: 'StartTimezone'},
            endTimezone: {from: 'EndTimezone'},
            description: {from: 'Description'},
            recurrenceId: {from: 'RecurrenceID'},
            recurrenceRule: {from: 'RecurrenceRule'},
            recurrenceException: {from: 'RecurrenceException'},
            ownerId: {from: 'OwnerID', defaultValue: 1},
            isAllDay: {type: 'boolean', from: 'IsAllDay'},
          },
        },
      },
      filter: {
        logic: 'or',
        filters: [
          {field: 'ownerId', operator: 'eq', value: 1},
          {field: 'ownerId', operator: 'eq', value: 2},
        ],
      },
    },
  };

  onDataBound = () => {
    // console.log('event :: dataBound');
    // console.log(e);
  };

  onChange = () => {
    // console.log('event :: change');
    // console.log(e);
  };

  render() {
    const {classes} = this.props;
    const {dataSource, startTime, resources} = this.state;

    return (
      <div className={classes.container}>
        <Scheduler
          height={600}
          change={this.onChange}
          views={this.views}
          dataBound={this.dataBound}
          dataSource={dataSource}
          date={this.state.date}
          startTime={startTime}
          resources={resources}
        />
      </div>
    );
  }
}

SchedulerContainer.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string,
  }),
};

export default withStyles(styles)(SchedulerContainer);
