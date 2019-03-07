import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
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
        <Grid item={true} xs={8}>
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
        <Grid item={true} xs={10} className={classes.figure}>
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
          xs={8}
          className={[classes.content, 'bottom-line'].join(' ')}
        >
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac ut consequat semper viverra. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis. Nulla posuere sollicitudin aliquam ultrices sagittis. Nec feugiat nisl pretium fusce id velit ut. Ut morbi tincidunt augue interdum velit euismod in pellentesque massa. 

Lacus viverra vitae congue eu consequat ac felis donec. Id diam vel quam elementum pulvinar. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Nec ullamcorper sit amet risus nullam eget felis. Rutrum quisque non tellus orci ac. Egestas integer eget aliquet nibh praesent tristique magna.`}
        </Grid>
      </Grid>
    </div>
  );
};

PostDetails.propTypes = {
  classes: PropTypes.shape({
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
