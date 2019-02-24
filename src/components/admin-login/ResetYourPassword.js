import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Caption from './elements/Caption';
import Container from './Container';

const styles = () => {
  return {
    Title: {
      textAlign: 'center',
      fontSize: '48px',
      marginBottom: '32px',
      lineHeight: '60px',
    },
    Description: {
      fontSize: '16px',
      lineHeight: '24px',
      margin: '0 auto',
      maxWidth: '420px',
      textAlign: 'center',
    },
  };
};

const ResetYourPassword = props => {
  const {classes} = props;

  return (
    <Container>
      <Grid item={true} xs={12} md={6} direction="column">
        <h1 className={[classes.Title, 'text-bold'].join(' ')}>
          {'Reset your password.'}
        </h1>
        <p className={classes.Description}>
          {
            'If this email address matches an existing Resource Finder account, we’ll send a link to reset your password.'
          }
        </p>
      </Grid>
    </Container>
  );
};

ResetYourPassword.propTypes = {
  classes: PropTypes.shape({
    Description: PropTypes.string,
    Title: PropTypes.string,
  }),
};

export default withStyles(styles)(ResetYourPassword);
