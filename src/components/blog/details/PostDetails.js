import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';
import {bindActionCreators} from 'redux';
import DOMPurify from 'dompurify';
import Grid from '@material-ui/core/Grid';

import Loading from 'Shared/Loading';
import RecentPosts from './RecentPost';
import PostDateInformation from './PostDateInformation';

import * as blogActions from 'Actions/blogs';

const styles = theme => ({
  body: {
    '& p': {
      color: '#070709',
      fontSize: '16px',
      lineHeight: '24px',
      opacity: '0.87',
    },
    '& h2': {
      color: '#070709',
      fontFamily: '"proxima-nova-bold", Georgia, sans-serif',
      fontSize: '24px',
      lineHeight: '32px',
      opacity: '0.87',
    },
    '& h3': {
      color: '#070709',
      fontFamily: '"proxima-nova-semi", Georgia, sans-serif',
      fontSize: '20px',
      lineHeight: '28px',
      opacity: '0.87',
    },
  },
  categories: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
    '& span': {
      display: 'block',
      fontSize: '16px',
      lineHeight: '24px',
      textDecoration: 'underline',
      textTransform: 'capitalize',
    },
    '& i': {
      marginRight: '8px',
    },
  },
  container: {
    flexGrow: 1,
    margin: '0 auto',
    maxWidth: theme.breakpoints.values.md,
  },
  content: {
    color: '#070709',
    fontSize: '16px',
    lineHeight: '24px',
    marginBottom: '50px',
    opacity: '0.87',
    paddingBottom: '50px',
  },
  figure: {
    marginBottom: '32px',
    '& img': {
      display: 'block',
      margin: '0 auto 16px',
    },
    '& figcaption': {
      color: '#070709',
      fontSize: '12px',
      lineHeight: '16px',
      opacity: '0.54',
      textAlign: 'center',
    },
  },
  title: {
    color: '#070709',
    fontSize: '34px',
    lineHeight: '40px',
    marginBottom: '24px',
    opacity: '0.87',
  },
});

class PostDetails extends PureComponent {
  componentDidUpdate(prevProps) {
    const {
      params: {id},
      getPosts,
    } = this.props;
    const {
      params: {id: prevId},
    } = prevProps;
    if (id !== prevId) {
      getPosts();
      window.scrollTo(0, 0);
    }
  }

  navigateToBlogIndexWithCategory = category => {
    const {router, actions} = this.props;

    actions.setCategory(category);
    router.push('/blog');
  };

  navigateToBlogWithId = id => {
    const {router} = this.props;

    router.push(`/blog/${id}`);
  };

  render() {
    const {classes, post, posts, actions, router} = this.props;
    const images = post.blog_post_attachments;
    const category = post.categories && post.categories[0].name;
    const id = this.props.post.organization && this.props.post.organization.id;
    let postsDetailsElement = <Loading />;

    if (Object.keys(post).length > 0) {
      postsDetailsElement = (
        <div className="post-details">
          <Grid
            container={true}
            className={classes.container}
            justify="center"
            alignItems="center"
            direction="row"
          >
            <Grid item={true} xs={12} md={8}>
              <div className={classes.categories}>
                <i className="material-icons">{'label'}</i>
                <span
                  className="text-semi title-as-link"
                  onClick={() => this.navigateToBlogIndexWithCategory(category)}
                >
                  {category}
                </span>
              </div>
              <h1 className={[classes.title, 'text-bold'].join(' ')}>
                {post.title}
              </h1>
              <PostDateInformation
                post={post}
                actions={actions}
                router={router}
              />
            </Grid>
            <Grid item={true} xs={12} md={10} className={classes.figure}>
              <img
                src={images && images[0].file_url}
                alt={images && images[0].file_legend}
              />
              <figcaption>{images && images[0].file_legend}</figcaption>
            </Grid>
            <Grid
              item={true}
              xs={12}
              md={8}
              className={[classes.content, 'bottom-line'].join(' ')}
            >
              <div
                className={classes.body}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.body),
                }}
              />
            </Grid>
          </Grid>
          {id ? (
            <RecentPosts
              posts={posts.results}
              getFeaturedPostById={actions.getFeaturedPostById}
              id={id}
              router={router}
              navigateToBlog={this.navigateToBlogWithId}
            />
          ) : null}
        </div>
      );
    }

    return postsDetailsElement;
  }
}

PostDetails.propTypes = {
  actions: PropTypes.shape({
    setCategory: PropTypes.func,
    getFeaturedPostById: PropTypes.func,
  }),
  classes: PropTypes.shape({
    body: PropTypes.string,
    categories: PropTypes.string,
    container: PropTypes.string,
    content: PropTypes.string,
    figure: PropTypes.string,
    postedBy: PropTypes.string,
    tag: PropTypes.string,
    title: PropTypes.string,
  }),
  getPosts: PropTypes.func,
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
  post: PropTypes.shape({
    blog_post_attachments: PropTypes.arrayOf(
      PropTypes.shape({
        file_url: PropTypes.string,
        file_legend: PropTypes.string,
      })
    ),
    body: PropTypes.string,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    organization: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    posted_at: PropTypes.string,
    title: PropTypes.string,
  }),
  posts: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({})),
    noResults: PropTypes.bool,
  }),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(blogActions, _dispatch),
  };
};

const mapStateToProps = _state => {
  const {blogs: _blogs} = _state;
  return {
    posts: {results: _blogs.organizationPosts, noResults: _blogs.noResults},
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(PostDetails)));
