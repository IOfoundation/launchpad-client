import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {POST} from './post.mock';
import DOMPurify from 'dompurify';

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
      fontSize: '16px',
      display: 'block',
      lineHeight: '24px',
      textDecoration: 'underline',
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
    display: 'flex',
    fontSize: '16px',
    lineHeight: '24px',
    opacity: '0.87',
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
  const {classes} = props;

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
            <span className="text-semi">{'Categories'}</span>
          </div>
          <h1 className={[classes.title, 'text-bold'].join(' ')}>
            {
              'Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua Eni Sunt Proident Blandit Aute In Dolor'
            }
          </h1>
          <p className={[classes.postedBy, 'text-semi'].join(' ')}>
            {'Posted By:'}
          </p>
          <div className={classes.tag}>
            <div className="right-line right-line--text">
              {'Governor’s Office of Business and Economic Development'}
            </div>
            <span>{'February 2, 2019'}</span>
          </div>
          <div />
        </Grid>
        <Grid item={true} xs={12} md={10} className={classes.figure}>
          <img
            src="https://robohash.org/repellendusetnulla.png?size=300x300&set=set1"
            alt="testing"
          />
          <figcaption>
            {'Rutrum quisque non tellus orci ac eget aliquet nibh praesent.'}
          </figcaption>
        </Grid>
        <Grid
          item={true}
          xs={12}
          md={8}
          className={[classes.content, 'bottom-line'].join(' ')}
        >
          <div
            className={classes.body}
            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(POST)}}
          />
        </Grid>
      </Grid>
    </div>
  );
};

PostDetails.propTypes = {
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
};

export default withStyles(styles)(PostDetails);
