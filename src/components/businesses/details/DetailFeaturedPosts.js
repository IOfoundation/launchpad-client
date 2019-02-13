import React, {Fragment} from 'react';
import DetailFeaturedPost from './DetailFeaturedPost';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {PropTypes} from 'prop-types';

const styles = () => ({
  featuredPosts: {
    boxSizing: 'border-box',
    flexGrow: 1,
    maxWidth: '675px',
  },
});

export const DetailFeaturedPosts = props => {
  const {classes} = props;

  return (
    <Fragment>
      <h2 className="detail-featured-posts__title">{'Post'}</h2>
      <div className={classes.featuredPosts}>
        <Grid container={true} spacing={16}>
          <Grid item={true} xs={12} md={4}>
            <DetailFeaturedPost
              description="Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse Cill"
              date="February 2, 2019"
            />
          </Grid>
          <Grid item={true} xs={12} md={4}>
            <DetailFeaturedPost
              description="Excepteur Sint Occaecat Cupidatat Non Proident Sunt"
              date="February 2, 2019"
            />
          </Grid>
          <Grid item={true} xs={12} md={4}>
            <DetailFeaturedPost
              description="Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua Eni…"
              date="February 2, 2019"
            />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

DetailFeaturedPosts.propTypes = {
  classes: PropTypes.shape({
    featuredPosts: PropTypes.string,
  }),
};

export default withStyles(styles)(DetailFeaturedPosts);
