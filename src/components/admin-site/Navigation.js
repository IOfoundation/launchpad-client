import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';

const styles = () => {
  return {
    container: {
      background: 'black',
      margin: '63px 0 24px',
      padding: '24px',
    },
    title: {
      fontFamily: '"proxima-nova-bold", Georgia, sans-serif',
      fontSize: '14px',
      lineHeight: '20px',
      marginBottom: '8px',
    },
    description: {
      fontFamily: '"proxima-nova-thin", Georgia, sans-serif',
      fontSize: '16px',
      lineHeight: '24px',
      marginBottom: '24px',
    },
    navigation: {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
      '& li': {
        marginBottom: '16px',
      },
    },
    link: {
      color: 'white',
      opacity: 0.75,
      '&:hover': {
        color: '#00BA81',
        opacity: 1,
      },
    },
  };
};

const Navigation = props => {
  const {classes} = props;

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>{'Your organization'}</h3>
      <p className={classes.description}>
        {"Governor's Office of Business and Economic Development"}
      </p>
      <ul className={classes.navigation}>
        <li>
          <a className={classes.link}>{'Profile'}</a>
        </li>
        <li>
          <a className={classes.link}>{'Locations'}</a>
        </li>
        <li>
          <a className={classes.link}>{'Services'}</a>
        </li>
        <li>
          <a className={classes.link}>{'Blog Posts'}</a>
        </li>
        <li>
          <a className={classes.link}>{'Events'}</a>
        </li>
      </ul>
      <h3 className={classes.title}>{'Status'}</h3>
      <p className={classes.description}>{'Published'}</p>
      <button className="btn btn__red">{'Unpublish'}</button>
    </div>
  );
};

Navigation.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
    navigation: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default withStyles(styles)(Navigation);
