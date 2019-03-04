import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';

import DetailFeaturedPost from './DetailFeaturedPost';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {PropTypes} from 'prop-types';
import Loading from '../../shared/Loading';
import {truncate} from '../../../utils';

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
    viewMore: true,
  };

  incrementPostViews = event => {
    event.preventDefault();
    this.setState(prevState => {
      return {
        postViews: prevState.postViews + 3,
      };
    });
  };

  viewMoreHandler = () => {
    this.setState(prevState => {
      return {
        viewMore: !prevState.viewMore,
      };
    });
  };

  render() {
    const {classes, posts} = this.props;
    const {viewMore} = this.state;
    const results = posts.results;
    let viewMoreElement = null;
    let postsElements = (
      <Loading elementConfig={{style: {marginRight: '53px'}}} />
    );

    if (posts.noResults) {
      postsElements = null;
    }

    if (results.length > 0) {
      let featuredPostsElements = null;
      if (results.length > 3) {
        viewMoreElement = (
          <a className="view-more" onClick={this.viewMoreHandler}>
            {viewMore ? 'View More' : 'View Less'}
          </a>
        );
      }

      if (viewMore) {
        featuredPostsElements = results.slice(0, 3).map(post => {
          let description = post.body;

          if (description.split('').length > 70) {
            description = truncate(description, 70);
          }

          return (
            <Grid key={post.id} item={true} xs={12} md={4}>
              <DetailFeaturedPost
                description={description}
                date="February 2, 2019"
              />
            </Grid>
          );
        });
      } else {
        featuredPostsElements = results.map(post => {
          let description = post.body;

          if (description.split('').length > 70) {
            description = truncate(description, 70);
          }

          return (
            <Grid key={post.id} item={true} xs={12} md={4}>
              <DetailFeaturedPost
                description={description}
                date="February 2, 2019"
              />
            </Grid>
          );
        });
      }

      postsElements = (
        <Fragment>
          <h2 className="details-title details-title--large-space text-bold">
            {'Posts'}
          </h2>
          <div className={classes.featuredPosts}>
            <Grid container={true} spacing={16}>
              {featuredPostsElements}
            </Grid>
          </div>
          {viewMoreElement}
        </Fragment>
      );
    }

    return postsElements;
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
