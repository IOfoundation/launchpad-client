import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router';
import Grid from '@material-ui/core/Grid';

import Container from './Container';
import SnackbarUI from '@Shared/SnackBar';
import Navigation from './Navigation';

const LandingComponent = props => {
  const {
    classes,
    children,
    navigation,
    router,
    hideFooter,
    displayName,
  } = props;
  const goToAccount = () => {
    router.push('/admin/account');
  };
  let navigationElement = null;

  if (navigation) {
    navigationElement = (
      <Grid item={true} xs={12} md={3}>
        <Navigation displayName={displayName} />
        <div className={`${classes.Edit} title-as-link`} onClick={goToAccount}>
          <i className="material-icons">{'person'}</i>
          <span>{'Edit Your Account'}</span>
        </div>
      </Grid>
    );
  }

  return (
    <Container hideFooter={hideFooter}>
      <SnackbarUI />
      {navigationElement}
      <Grid
        item={true}
        xs={12}
        md={navigation ? 9 : 10}
        className={classes.Content}
      >
        {children}
      </Grid>
    </Container>
  );
};

const styles = theme => {
  return {
    Title: {
      textAlign: 'center',
      fontSize: '48px',
      marginBottom: '32px',
      lineHeight: '60px',
    },
    Content: {
      paddingLeft: '24px',
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '0',
      },
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
      [theme.breakpoints.down('sm')]: {
        marginBottom: '16px',
      },
    },
  };
};

LandingComponent.propTypes = {
  breakpoint: PropTypes.string,
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
  displayName: PropTypes.string,
  hideFooter: PropTypes.bool,
  navigation: PropTypes.bool,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default withStyles(styles)(withRouter(LandingComponent));
