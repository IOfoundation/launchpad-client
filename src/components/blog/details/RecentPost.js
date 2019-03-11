import React, {PureComponent, Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {truncate} from '../../../utils';
import PostDateInformation from './PostDateInformation';
import RecentPostLoading from './RecentPostLoading';

const styles = theme => {
  return {
    left: {
      color: '#070709',
      background: 'white',
      padding: '56px 94px 80px 15%',
      [theme.breakpoints.down('sm')]: {
        padding: '2em',
      },
    },
    right: {
      color: 'white',
      background: '#4A4A4A',
      padding: '56px 15% 80px 94px',
      [theme.breakpoints.down('sm')]: {
        padding: '2em',
      },
    },
    title: {
      fontFamily: '"proxima-nova-semi", Georgia, sans-serif',
      fontSize: '34px',
      lineHeight: '40px',
      marginBottom: '16px',
      opacity: '0.87',
    },
  };
};

class RecentPosts extends PureComponent {
  componentDidMount() {
    const {getFeaturedPostById, id} = this.props;

    getFeaturedPostById(id);
  }

  render() {
    const {classes, posts, router, navigateToBlog} = this.props;
    let recentPostsElement = (
      <Fragment>
        <Grid item={true} xs={12} md={6} className={classes.left}>
          <RecentPostLoading black={true} />
        </Grid>
        <Grid item={true} xs={12} md={6} className={classes.right}>
          <RecentPostLoading />
        </Grid>
      </Fragment>
    );

    if (posts.length > 0) {
      const classesTitle = [classes.title, 'title-as-link'];

      recentPostsElement = posts.slice(0, 2).map((post, i, {length}) => {
        let title = post.title;

        if (title.split('').length > 55) {
          title = truncate(title, 55);
        }

        return (
          <Grid
            item={true}
            xs={12}
            md={6}
            className={length - 1 === i ? classes.right : classes.left}
            key={post.id}
          >
            <h2
              className={classesTitle.join(' ')}
              onClick={() => navigateToBlog(post.id)}
            >
              {title}
            </h2>
            <PostDateInformation post={post} noBorder={true} router={router} />
          </Grid>
        );
      });
    }

    return (
      <div className="recent-posts">
        <Grid container={true}>{recentPostsElement}</Grid>
      </div>
    );
  }
}

RecentPosts.propTypes = {
  classes: PropTypes.shape({
    left: PropTypes.string,
    right: PropTypes.string,
    title: PropTypes.string,
  }),
  getFeaturedPostById: PropTypes.func,
  id: PropTypes.number,
  navigateToBlog: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.shape({})),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default withStyles(styles)(RecentPosts);
