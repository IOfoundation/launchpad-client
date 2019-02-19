import React from 'react';
import {PropTypes} from 'prop-types';

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
});

const Container = props => {
  const {classes, children} = props;

  return (
    <div className={['admin-login', classes.container].join(' ')}>
      <section className={['content-section', classes.content].join(' ')}>
        <Grid container={true} justify="center" alignItems="center">
          {children}
        </Grid>
      </section>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  classes: PropTypes.shape({
    content: PropTypes.string,
    container: PropTypes.string,
  }),
};

export default withStyles(styles)(Container);
