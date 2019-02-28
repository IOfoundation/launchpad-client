import React, {PureComponent} from 'react';
import {containerStyles} from '../../utils';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/blogs';

import FeaturedPost from './FeaturedPost';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Loading from '../shared/Loading';
import {truncate} from '../../utils';

const styles = theme => ({
  featuredPost: {
    ...containerStyles(theme),
    alignItems: 'center',
    display: 'flex',
    margin: '0 auto 32px',
    minHeight: '297px',
    padding: 12,
  },
});

class FeaturedPosts extends PureComponent {
  componentDidMount() {
    this.props.actions.getFeaturedPost();
  }

  render() {
    const {classes, posts} = this.props;
    let resultsElements = (
      <Loading elementConfig={{style: {margin: '0 auto', padding: 0}}} />
    );

    if (posts.results.length > 0) {
      resultsElements = posts.results.slice(0, 4).map(post => {
        let description = post.body;
        let title = post.title;

        if (description.split('').length > 30) {
          description = truncate(description, 30);
        }

        if (title.split('').length > 80) {
          title = truncate(title, 80);
        }

        return (
          <Grid item={true} xs={6} md={4} lg={3} key={post.id}>
            <FeaturedPost
              imageSrc={post.blog_post_attachments[0].file_url}
              title={title}
              description={description}
            />
          </Grid>
        );
      });
    }

    return (
      <div className={classes.featuredPost}>
        <Grid container={true} spacing={24}>
          {resultsElements}
        </Grid>
      </div>
    );
  }
}

FeaturedPosts.propTypes = {
  actions: PropTypes.shape({
    getFeaturedPost: PropTypes.func,
  }),
  classes: PropTypes.shape({
    featuredPost: PropTypes.string,
  }),
  posts: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({})),
    noResults: PropTypes.bool,
  }),
};

const mapStateToProps = _state => {
  const {blogs: _blogs} = _state;

  return {
    posts: {results: _blogs.featuredPosts, noResults: _blogs.noResults},
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
  )(FeaturedPosts)
);
