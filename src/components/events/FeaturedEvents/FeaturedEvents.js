import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {containerStyles} from '../../../utils';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {getDate} from '../../../utils';
import * as actions from '../../../actions/events';

import FeaturedEvent from './FeaturedEvent';

const styles = theme => ({
  content: {
    padding: 12,
    ...containerStyles(theme),
  },
});

class FeaturedEvents extends PureComponent {
  componentDidMount() {
    const monthsNumber = getDate().nextThreeMonths.map(month => month.number);
    this.props.actions.getEventsByMonth(monthsNumber, 'featured');
  }

  render() {
    const {classes, featuredEvents} = this.props;

    let featuredEventsElements;
    if (featuredEvents.length > 0) {
      featuredEventsElements = featuredEvents.map(month => {
        const infoElements = month[month.key].map(info => {
          return (
            <FeaturedEvent
              key={info.id}
              title={info.title}
              description={info.body}
              date={`${info.starting_at.monthLarge} ${info.starting_at.day}, ${
                info.starting_at.year
              }`}
              name={info.organization.name}
            />
          );
        });

        return (
          <Grid item={true} xs={4} key={month.key}>
            <h2 className="featured-events__title text-bold">{month.title}</h2>
            {infoElements}
          </Grid>
        );
      });
    }

    return (
      <div className={[classes.content, 'featured-events'].join(' ')}>
        <Grid container={true} spacing={24}>
          {featuredEventsElements}
        </Grid>
      </div>
    );
  }
}

const mapPropsToState = _state => {
  return {
    featuredEvents: _state.events.featuredEvents,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

FeaturedEvents.propTypes = {
  actions: PropTypes.shape({
    getEventsByMonth: PropTypes.func,
  }),
  classes: PropTypes.shape({
    content: PropTypes.string,
  }),
  featuredEvents: PropTypes.arrayOf(PropTypes.shape({})),
};

export default withStyles(styles)(
  connect(
    mapPropsToState,
    mapDispatchToProps
  )(FeaturedEvents)
);
