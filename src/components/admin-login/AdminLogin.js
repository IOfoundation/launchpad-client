import React from 'react';

import Caption from './elements/Caption';
import SingInForm from './elements/SignInForm';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {containerStyles} from '../../utils/containerStyles';

const styles = theme => ({
  content: {
    ...containerStyles(theme),
  },
});

const AdminLogin = props => {
  const {classes} = props;

  return (
    <div className="admin-login">
      <section className={['content-section', classes.content].join(' ')}>
        <Grid container={true}>
          <Caption title="Login in to your admin account">
            <span>
              {"Have a resource you'd like listed?"} <a>{'Sign up here'}</a>{' '}
            </span>
          </Caption>
          <SingInForm />
        </Grid>
      </section>
    </div>
  );
};

export default withStyles(styles)(AdminLogin);
