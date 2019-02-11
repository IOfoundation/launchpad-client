import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';

import Jumbotron from '../shared/Jumbotron';
import FeaturedPosts from './FeaturedPosts';
import Categories from './Categories';
import PostLists from './PostLists';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
});

const Blog = props => {
  const {classes} = props;

  return (
    <div className="blog-container">
      <Jumbotron
        title="Resource Finder Blog"
        description="Find content relevant to your industry and business stage."
        descriptionModifacor="full-white"
      />
      <FeaturedPosts />
      <div className="blog-container__content">
        <Grid container={true} spacing={24}>
          <Grid item={true} xs={3}>
            <Categories />
          </Grid>
          <Grid item={true} xs={9}>
            <PostLists section="Front Page" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

Blog.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
};

export default withStyles(styles)(Blog);
