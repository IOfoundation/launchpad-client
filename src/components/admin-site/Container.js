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
    backgroundColor: '#F7F9FD',
    display: 'flex',
    padding: '46px 0',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '2em',
      height: 'auto',
      marginTop: '52px',
    },
  },
});

const Container = props => {
  const {classes, children} = props;

  return (
    <div className={['admin-login', classes.container].join(' ')}>
      <section className={['content-section', classes.content].join(' ')}>
        <Grid container={true} justify="center" alignItems="flex-start">
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
    container: PropTypes.string,
    content: PropTypes.string,
    item: PropTypes.string,
  }),
};

export default withStyles(styles)(Container);
