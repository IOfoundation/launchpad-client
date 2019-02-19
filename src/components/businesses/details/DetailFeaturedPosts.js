import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';

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
    marginBottom: '20px',
  },
});

class DetailFeaturedPosts extends PureComponent {
  state = {
    postViews: 3,
    viewMore: false,
  };

  incrementPostViews = event => {
    event.preventDefault();
    this.setState(prevState => {
      return {
        postViews: prevState.postViews + 3,
      };
    });
  };

  render() {
    const {classes, posts} = this.props;
    const {postViews} = this.state;
    const results = posts.results;
    let $viewMore = null;
    let $posts = <Loading elementConfig={{style: {marginRight: '53px'}}} />;

    if (posts.noResults) {
      $posts = null;
    }

    if (results.length > 0) {
      if (results.length > 3 && postViews < 9) {
        $viewMore = (
          <a className="view-more" onClick={this.incrementPostViews}>
            {'View More'}
          </a>
        );
      }

      const $featuredPosts = results.slice(0, postViews).map(post => {
        return (
          <Grid key={post.id} item={true} xs={12} md={4}>
            <DetailFeaturedPost
              description={post.body}
              date="February 2, 2019"
            />
          </Grid>
        );
      });

      $posts = (
        <Fragment>
          <h2 className="detail-featured-posts__title">{'Posts'}</h2>
          <div className={classes.featuredPosts}>
            <Grid container={true} spacing={16}>
              {$featuredPosts}
            </Grid>
          </div>
          {$viewMore}
        </Fragment>
      );
    }

    return $posts;
  }
}

DetailFeaturedPosts.propTypes = {
  classes: PropTypes.shape({
    featuredPosts: PropTypes.string,
  }),
  posts: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.object),
    noResults: PropTypes.bool,
  }),
};

const mapStateToProps = _state => {
  const {blogs: _blogs} = _state;

  return {
    posts: {results: _blogs.organizationPosts, noResults: _blogs.noResults},
  };
};

export default connect(mapStateToProps)(
  withStyles(styles)(DetailFeaturedPosts)
);
