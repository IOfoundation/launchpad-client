import React, {Fragment, PureComponent} from 'react';
import DetailFeaturedPost from './DetailFeaturedPost';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {PropTypes} from 'prop-types';
import Loading from '../../shared/Loading';

const styles = () => ({
  featuredPosts: {
    boxSizing: 'border-box',
    flexGrow: 1,
    maxWidth: '675px',
  },
});

class DetailFeaturedPosts extends PureComponent {
  state = {
    postViews: 3,
    viewMore: false,
  };

  incrementPostViews = () => {
    this.setState(prevState => {
      return {
        postViews: prevState.postViews + 3,
      };
    });
  };

  render() {
    const {classes, posts} = this.props;
    const {postViews} = this.state;
    let $viewMore = null;
    let $post = <Loading elementConfig={{style: {marginRight: '53px'}}} />;

    if (posts.length > 0) {
      if (posts.length > 3) {
        $viewMore = (
          <a className="view-more" onClick={this.incrementPostViews}>
            {'View More'}
          </a>
        );
      }

      const $featuredPosts = posts.slice(0, postViews).map(post => {
        return (
          <Grid key={post.id} item={true} xs={12} md={4}>
            <DetailFeaturedPost
              description={post.body}
              date="February 2, 2019"
            />
          </Grid>
        );
      });

      $post = (
        <Fragment>
          <h2 className="detail-featured-posts__title">{'Post'}</h2>
          <div className={classes.featuredPosts}>
            <Grid container={true} spacing={16}>
              {$featuredPosts}
            </Grid>
          </div>
          {$viewMore}
        </Fragment>
      );
    }

    return $post;
  }
}

DetailFeaturedPosts.propTypes = {
  classes: PropTypes.shape({
    featuredPosts: PropTypes.string,
  }),
  posts: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(styles)(DetailFeaturedPosts);
