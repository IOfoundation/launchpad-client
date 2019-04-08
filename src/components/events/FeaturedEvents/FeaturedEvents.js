import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import FeaturedEvent from './FeaturedEvent';
import Loading from '@Shared/Loading';

import {getDate, containerStyles} from '@Utils';

const styles = theme => ({
  container: {
    ...containerStyles(theme),
    padding: 12,
    overflowX: 'auto',
  },
  featuredEvents: {
    minWidth: theme.breakpoints.values.md,
  },
});

class FeaturedEvents extends PureComponent {
  componentDidMount() {
    const monthsNumber = getDate().nextThreeMonths.map(month => month.number);
    this.props.actions.getEventsByMonth(monthsNumber, 'featured');
  }

  mapDataToModal(info) {
    return {
      ...info,
      ending_at: info.ending_at.pacificTime,
      posted_at: info.posted_at.pacificTime,
      starting_at: info.starting_at.pacificTime,
    };
  }

  render() {
    const {classes, featuredEvents, handlerModalVisibility} = this.props;
    const {data: events, loading} = featuredEvents;
    let featuredEventsElements = <Loading />;

    if (events.length > 0 && !Array.isArray(events[0]) && !loading) {
      featuredEventsElements = events.map(month => {
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
              handlerModalVisibility={() =>
                handlerModalVisibility(this.mapDataToModal(info))
              }
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

      featuredEventsElements = (
        <div className={[classes.container, 'featured-events'].join(' ')}>
          <Grid
            container={true}
            spacing={24}
            className={classes.featuredEvents}
          >
            {featuredEventsElements}
          </Grid>
        </div>
      );
    } else if (!loading) {
      featuredEventsElements = null;
    }

    return featuredEventsElements;
  }
}

FeaturedEvents.propTypes = {
  actions: PropTypes.shape({
    getEventsByMonth: PropTypes.func,
  }),
  classes: PropTypes.shape({
    container: PropTypes.string,
    featuredEvents: PropTypes.string,
  }),
  featuredEvents: PropTypes.shape({
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({})),
      PropTypes.arrayOf(PropTypes.array),
    ]),
    errors: PropTypes.shape({}),
    loading: PropTypes.bool,
  }),
  handlerModalVisibility: PropTypes.func,
};

export default withStyles(styles)(FeaturedEvents);
