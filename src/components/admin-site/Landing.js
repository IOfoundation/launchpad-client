import React, {Fragment} from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Container from './Container';
import Navigation from './Navigation';

const LandingComponent = props => {
  const {classes, children, navigation} = props;
  let navigationElement = null;

  if (navigation) {
    navigationElement = (
      <Fragment>
        <Navigation />
        <div className={classes.Edit}>
          <i className="material-icons">{'person'}</i>
          <span>{'Edit Your Account'}</span>
        </div>
      </Fragment>
    );
  }

  return (
    <Container>
      <Grid item={true} xs={3}>
        {navigationElement}
      </Grid>
      <Grid item={true} xs={9} className={classes.Content}>
        {children}
      </Grid>
    </Container>
  );
};

const styles = () => {
  return {
    Title: {
      textAlign: 'center',
      fontSize: '48px',
      marginBottom: '32px',
      lineHeight: '60px',
    },
    Content: {
      paddingLeft: '24px',
    },
    Description: {
      fontSize: '16px',
      lineHeight: '24px',
      margin: '0 auto',
      maxWidth: '420px',
      textAlign: 'center',
    },
    Edit: {
      color: '#7B7C7E',
      fontFamily: '"proxima-nova-bold", Georgia, sans-serif',
      fontSize: '16px',
      lineHeight: '24px',
      display: 'flex',
      '& i': {
        marginRight: '8px',
      },
    },
  };
};

LandingComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  classes: PropTypes.shape({
    Content: PropTypes.string,
    Description: PropTypes.string,
    Edit: PropTypes.string,
    Title: PropTypes.string,
  }),
  navigation: PropTypes.bool,
};

export default withStyles(styles)(LandingComponent);
