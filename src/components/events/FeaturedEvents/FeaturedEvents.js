import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import FeaturedEvent from './FeaturedEvent';
import FeaturedEventLoading from './FeaturedEventLoading';

import {containerStyles} from '@Utils';

const styles = theme => ({
  container: {
    ...containerStyles(theme),
    padding: 12,
    overflowX: 'auto',
  },
  loading: {
    ...containerStyles(theme),
    maxHeight: '270px',
  },
  featuredEvents: {
    minWidth: theme.breakpoints.values.md,
  },
});

const FeaturedEvents = props => {
  const mapDataToModal = info => {
    return {
      ...info,
      ending_at: info.ending_at.pacificTime,
      posted_at: info.posted_at.pacificTime,
      starting_at: info.starting_at.pacificTime,
    };
  };

  const {classes, featuredEvents, handlerModalVisibility} = props;
  const {data: events, loading} = featuredEvents;
  let featuredEventsElements = (
    <div className={[classes.container, 'featured-events'].join(' ')}>
      <FeaturedEventLoading />
    </div>
  );

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
              handlerModalVisibility(mapDataToModal(info))
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
        <Grid container={true} spacing={24} className={classes.featuredEvents}>
          {featuredEventsElements}
        </Grid>
      </div>
    );
  } else if (events.length === 0 && !loading) {
    featuredEventsElements = null;
  }

  return featuredEventsElements;
};

FeaturedEvents.propTypes = {
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
