import React from 'react';
import {Link} from 'react-router';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';

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
          <Link
            activeStyle={activeStyles}
            className={classes.link}
            to="/admin/profile"
          >
            {'Profile'}
          </Link>
        </li>
        <li>
          <Link
            activeStyle={activeStyles}
            className={classes.link}
            to="/admin/location"
          >
            {'Locations'}
          </Link>
        </li>
        <li>
          <Link
            activeStyle={activeStyles}
            className={classes.link}
            to="/admin/services"
          >
            {'Services'}
          </Link>
        </li>
        <li>
          <a className={classes.link}>{'Blog Posts'}</a>
        </li>
        <li>
          <a className={classes.link}>{'Events'}</a>
        </li>
      </ul>
      <h3 className={`${classes.title} m-top-16`}>{'Status'}</h3>
      <p className={classes.description}>{'Published'}</p>
      <button className="btn btn__red">{'Unpublish'}</button>
    </div>
  );
};

const activeStyles = {
  color: '#00ba81',
  opacity: 1,
  fontFamily: '"proxima-nova-bold", Georgia, sans-serif',
};

const styles = () => {
  return {
    container: {
      background: 'black',
      margin: '68px 0 24px',
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
      borderBottom: '1px solid #1F1F1F',
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
