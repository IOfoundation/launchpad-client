import React from 'react';
import {containerStyles} from '../../utils';

import FeaturedPost from './FeaturedPost';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  featuredPost: {
    padding: 12,
    ...containerStyles(theme),
    margin: '0 auto 32px',
  },
});

const FeaturedPosts = props => {
  const {classes} = props;

  return (
    <div className={classes.featuredPost}>
      <Grid container={true} spacing={24}>
        <Grid item={true} xs={6} md={4} lg={3}>
          <FeaturedPost
            imageSrc="/static-data/images/orgs-placeholder.png"
            title="Cras justo odio, dapibus ac facilisis in, egestas eget quam. "
            description="Grow America Fund"
          />
        </Grid>
        <Grid item={true} xs={6} md={4} lg={3}>
          <FeaturedPost
            imageSrc="/static-data/images/orgs-placeholder.png"
            title="Donec id elit non mi porta gravida at eget metus. Curabitur blandit tempus porttitor."
            description="Governor’s Office of Business and Ec"
          />
        </Grid>
        <Grid item={true} xs={6} md={4} lg={3}>
          <FeaturedPost
            imageSrc="/static-data/images/orgs-placeholder.png"
            title="Fusce dapibus, tellus ac cursus commodo, tortor mauri"
            description="Grow America Fund"
          />
        </Grid>
        <Grid item={true} xs={6} md={4} lg={3}>
          <FeaturedPost
            imageSrc="/static-data/images/orgs-placeholder.png"
            title="Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermen"
            description="Governor’s Office of Business and Ec"
          />
        </Grid>
      </Grid>
    </div>
  );
};

FeaturedPosts.propTypes = {
  classes: PropTypes.shape({
    featuredPost: PropTypes.string,
  }),
};

export default withStyles(styles)(FeaturedPosts);
