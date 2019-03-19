import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import SnackbarUI from '@Shared/SnackBar';

import {containerStyles} from '@Utils/containerStyles';

const Container = props => {
  const {classes, children, direction, modifier} = props;

  return (
    <div
      className={['admin-login', classes.container, classes[modifier]].join(
        ' '
      )}
    >
      <SnackbarUI />
      <section className={['content-section', classes.content].join(' ')}>
        <Grid
          container={true}
          justify="center"
          alignItems="center"
          direction={direction}
        >
          {children}
        </Grid>
      </section>
    </div>
  );
};

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
    [theme.breakpoints.down('sm')]: {
      padding: '2em',
      height: 'auto',
      marginTop: '52px',
    },
  },
  item: {
    marginRight: '2em',
  },
  modifier: {
    alignItems: 'flex-start',
    paddingTop: '131px',
    [theme.breakpoints.down('sm')]: {
      padding: '10em 2em 2em',
    },
  },
});

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  classes: PropTypes.shape({
    content: PropTypes.string,
    container: PropTypes.string,
    item: PropTypes.string,
  }),
  direction: PropTypes.string,
  modifier: PropTypes.string,
};

export default withStyles(styles)(Container);
