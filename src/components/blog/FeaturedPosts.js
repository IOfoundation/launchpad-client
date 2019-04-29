import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {withRouter} from 'react-router';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import FeaturedPost from './FeaturedPost';
import Loading from '@Shared/Loading';

import * as actions from '@Actions/blogs';
import {truncate, htmlStripper, containerStyles} from '@Utils';

class FeaturedPosts extends PureComponent {
  componentDidMount() {
    this.props.actions.getFeaturedPost();
  }

  render() {
    const {classes, posts, router, loading} = this.props;
    let content = (
      <Loading elementConfig={{style: {margin: '0 auto', padding: 0}}} />
    );

    if (posts.results.length > 0) {
      const resultsElements = posts.results.slice(0, 4).map(post => {
        let description = htmlStripper(post.body);
        let title = post.title;

        if (description.split('').length > 30) {
          description = truncate(description, 30);
        }

        if (title.split('').length > 80) {
          title = truncate(title, 80);
        }

        return (
          <Grid item={true} xs={3} key={post.id}>
            <FeaturedPost
              imageSrc={post.blog_post_attachments[0].file_url}
              title={title}
              description={description}
              clicked={() => router.push(`/blog/${post.id}`)}
            />
          </Grid>
        );
      });

      content = (
        <div className={classes.container}>
          <Grid container={true} spacing={24} className={classes.featuredPosts}>
            {resultsElements}
          </Grid>
        </div>
      );
    } else if (!loading) {
      content = null;
    }

    return content;
  }
}

const styles = theme => ({
  container: {
    ...containerStyles(theme),
    alignItems: 'center',
    display: 'flex',
    margin: '0 auto 32px',
    minHeight: '297px',
    padding: 12,
    overflowX: 'auto',
  },
  featuredPosts: {
    minWidth: '960px',
  },
});

FeaturedPosts.propTypes = {
  actions: PropTypes.shape({
    getFeaturedPost: PropTypes.func,
  }),
  classes: PropTypes.shape({
    container: PropTypes.string,
    featuredPosts: PropTypes.string,
  }),
  loading: PropTypes.bool,
  posts: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({})),
    noResults: PropTypes.bool,
  }),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};

const mapStateToProps = _state => {
  const {blogs: _blogs} = _state;

  return {
    posts: {results: _blogs.featuredPosts, noResults: _blogs.noResults},
    loading: _blogs.getFeaturedPostloading,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(FeaturedPosts))
);
