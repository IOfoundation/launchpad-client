import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';
import Grid from '@material-ui/core/Grid';
import DOMPurify from 'dompurify';
import {getDate} from '../../../utils';
import {withRouter} from 'react-router';
import * as blogActions from '../../../actions/blogs';
import {bindActionCreators} from 'redux';

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
  postedBy: {
    fontSize: '12px',
    lineHeight: '16px',
  },
  tag: {
    borderBottom: '1px solid black',
    display: 'flex',
    fontSize: '16px',
    lineHeight: '24px',
    marginBottom: '30px',
    opacity: '0.87',
    paddingBottom: '30px',
    '& div': {
      marginRight: '12px',
      paddingRight: '12px',
      textDecoration: 'underline',
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

const PostDetails = props => {
  const {classes, post, router, actions} = props;
  const images = post.blog_post_attachments;
  const date = getDate(post.posted_at);
  const category = post.categories && post.categories[0].name;
  const id = post.organization && post.organization.id;

  const navigateBlog = () => {
    actions.setCategory(category);
    router.push('/blog');
  };

  return (
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
            <span className="text-semi title-as-link" onClick={navigateBlog}>
              {category}
            </span>
          </div>
          <h1 className={[classes.title, 'text-bold'].join(' ')}>
            {post.title}
          </h1>
          <p className={[classes.postedBy, 'text-semi'].join(' ')}>
            {'Posted By:'}
          </p>
          <div className={classes.tag}>
            <div
              className="right-line right-line--text post-details__link"
              onClick={() => router.push(`/businesses/${id}`)}
            >
              {post.organization && post.organization.name}
            </div>
            <span>{`${date.monthLarge} ${date.day}, ${date.year}`}</span>
          </div>
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
            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.body)}}
          />
        </Grid>
      </Grid>
    </div>
  );
};

PostDetails.propTypes = {
  actions: PropTypes.shape({
    setCategory: PropTypes.func,
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
      name: PropTypes.string,
    }),
    posted_at: PropTypes.string,
    title: PropTypes.string,
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

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(withRouter(PostDetails)));
