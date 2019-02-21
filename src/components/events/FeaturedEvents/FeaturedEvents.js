import React from 'react';
import {containerStyles} from '../../../utils';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import FeaturedEvent from './FeaturedEvent';

const styles = theme => ({
  content: {
    padding: 12,
    ...containerStyles(theme),
  },
});

const FeaturedEvents = props => {
  const {classes} = props;

  return (
    <div className={[classes.content, 'featured-events'].join(' ')}>
      <Grid container={true} spacing={24}>
        <Grid item={true} xs={4}>
          <h2 className="featured-events__title text-bold">{'November'}</h2>
          <FeaturedEvent
            title="Special Conference for Lorem"
            description="Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
            date="November 2, 2017"
            name="Resource Name"
          />

          <FeaturedEvent
            title="Raising Investor Capital The Right Way"
            description="Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros"
            date="November 2, 2017"
            name="Resource Name"
          />
        </Grid>
        <Grid item={true} xs={4}>
          <h2 className="featured-events__title text-bold">{'December'}</h2>
          <FeaturedEvent
            title="Raising Investor Capital The Right Way"
            description="Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros"
            date="November 12, 2017"
            name="Resource Name"
          />

          <FeaturedEvent
            title="Special Conference for Long Name Ipsum"
            description="Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. "
            date="November 2, 2017"
            name="Resource Name"
          />

          <FeaturedEvent
            title="Managing Your Books"
            description="Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros"
            date="November 12, 2017"
            name="Resource Name"
          />
        </Grid>
        <Grid item={true} xs={4}>
          <h2 className="featured-events__title text-bold">{'January'}</h2>
          <FeaturedEvent
            title="Managing Your Books"
            description="Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros"
            date="November 12, 2017"
            name="Resource Name"
          />
        </Grid>
      </Grid>
    </div>
  );
};

FeaturedEvents.propTypes = {
  classes: PropTypes.shape({
    content: PropTypes.string,
  }),
};

export default withStyles(styles)(FeaturedEvents);
