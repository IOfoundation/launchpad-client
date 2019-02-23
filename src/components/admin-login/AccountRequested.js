import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router';

import Container from './Container';
import Grid from '@material-ui/core/Grid';

const styles = () => ({
  Title: {
    fontSize: '48px',
    lineHeight: '60px',
    marginBottom: '24px',
    textAlign: 'center',
  },
  Information: {
    fontSize: '24px',
    lineHeight: '32px',
    textAlign: 'center',
  },
  Button: {
    maxWidth: '386px',
    margin: '0 auto',
  },
});

const AccountRequested = props => {
  const {classes, router} = props;

  return (
    <Container>
      <Grid item={true} xs={12} md={6}>
        <h1 className={[classes.Title, 'text-semi'].join(' ')}>
          {'Account Requested'}
        </h1>
        <p className={[classes.Information, 'm-bot-28'].join(' ')}>
          {
            'Thank you for requesting an account to list your resource. You will be notified by email of your approval status.'
          }
        </p>
        <button
          className={['btn', 'btn btn__submit', classes.Button].join(' ')}
          type="button"
          onClick={() => router.push('/businesses')}
        >
          {'Return to Resources'}
        </button>
      </Grid>
    </Container>
  );
};

AccountRequested.propTypes = {
  classes: PropTypes.shape({
    Title: PropTypes.string,
    Information: PropTypes.string,
    Button: PropTypes.string,
  }),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default withRouter(withStyles(styles)(AccountRequested));
