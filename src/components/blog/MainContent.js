import React from 'react';
import {containerStyles} from '../../utils/containerStyles';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';
import Categories from './Categories';
import PostLists from './PostLists';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  content: {
    ...containerStyles(theme),
  },
});

const MainContent = props => {
  const {classes} = props;

  return (
    <div className={classes.content}>
      <Grid container={true} spacing={24}>
        <Grid item={true} xs={3}>
          <Categories />
        </Grid>
        <Grid item={true} xs={9}>
          <PostLists section="Front Page" />
        </Grid>
      </Grid>
    </div>
  );
};

MainContent.propTypes = {
  classes: PropTypes.shape({
    content: PropTypes.string,
  }),
};

export default withStyles(styles)(MainContent);
