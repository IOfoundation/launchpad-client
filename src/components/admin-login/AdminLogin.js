import React from 'react';
import {PropTypes} from 'prop-types';

import Caption from './elements/Caption';
import FormsContainer from './elements/FormsContainer';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {containerStyles} from '../../utils/containerStyles';

const styles = theme => ({
  content: {
    ...containerStyles(theme),
    color: 'white',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#4a4a4a',
    backgroundImage: "url('/static-data/backgrounds/admin-login.png')",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    height: 'calc(100vh - 48px)',
    justifyContent: 'center',
    [theme.breakpoints.up('xs')]: {
      padding: '2em',
    },
  },
  subTitle: {
    fontSize: '24px',
    lineHeight: '32px',
    marginBottom: '8px',
  },
  anchor: {
    color: 'white',
    fontSize: '24px',
    lineHeight: '32px',
    textDecoration: 'underline',
    '&:hover': {
      color: '#02ba81',
    },
  },
});

const AdminLogin = props => {
  const {classes} = props;

  return (
    <div className={['admin-login', classes.container].join(' ')}>
      <section className={['content-section', classes.content].join(' ')}>
        <Grid container={true} justify="center" alignItems="center">
          <Caption title="Log in to your admin account.">
            <p className={[classes.subTitle, 'text-thin'].join(' ')}>
              {"Have a resource you'd like listed?"}
            </p>
            <a className={[classes.anchor, 'text-thin'].join(' ')}>
              {'Sign up here'}
            </a>
          </Caption>
          <FormsContainer />
        </Grid>
      </section>
    </div>
  );
};

AdminLogin.propTypes = {
  classes: PropTypes.shape({
    content: PropTypes.string,
    container: PropTypes.string,
  }),
};

export default withStyles(styles)(AdminLogin);
