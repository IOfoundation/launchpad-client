import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {withRouter} from 'react-router';

import LandingComponent from '../Landing';
import Title from '../Title';

const styles = () => {
  return {
    item: {
      background: '#EAECF0',
      color: '#070709',
      cursor: 'pointer',
      fontSize: '20px',
      height: '75px',
      lineHeight: '28px',
      marginBottom: '16px',
      padding: '16px',
      '&:hover': {
        background: '#ddf2f0',
      },
    },
  };
};

const Services = props => {
  const {classes, router} = props;
  const createEditService = () => {
    router.push('/admin/services/1');
  };

  return (
    <LandingComponent navigation={true}>
      <Title
        titleText="Services"
        hideCancelAction={true}
        submitLabel={'Create a Service'}
        submitClicked={createEditService}
      />
      <div style={{padding: 8}}>
        <Grid
          container={true}
          spacing={16}
          className={classes.item}
          alignContent={'center'}
          alignItems={'center'}
          onClick={createEditService}
        >
          <Grid item={true}>
            {'Office of Small Business and Entrepreneurship '}
          </Grid>
        </Grid>
        <Grid
          container={true}
          spacing={16}
          className={classes.item}
          alignContent={'center'}
          alignItems={'center'}
          onClick={createEditService}
        >
          <Grid item={true}>{'Business Investment Services'}</Grid>
        </Grid>
        <Grid
          container={true}
          spacing={16}
          className={classes.item}
          alignContent={'center'}
          alignItems={'center'}
          onClick={createEditService}
        >
          <Grid item={true}>{'Permit Assistance'}</Grid>
        </Grid>
      </div>
    </LandingComponent>
  );
};

Services.propTypes = {
  classes: PropTypes.shape({
    item: PropTypes.string,
  }),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default withStyles(styles)(withRouter(Services));
