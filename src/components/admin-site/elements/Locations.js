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
      color: 'black',
      cursor: 'pointer',
      height: '75px',
      marginBottom: '16px',
      padding: '16px',
      '&:hover': {
        background: '#ddf2f0',
      },
    },
  };
};

const Locations = props => {
  const {classes, router} = props;
  const createEditLocation = () => {
    router.push('/admin/location/1');
  };

  return (
    <LandingComponent navigation={true}>
      <Title
        titleText="Locations"
        hideCancelAction={true}
        submitLabel={'Add Location'}
        submitClicked={createEditLocation}
      />
      <div style={{padding: 8}}>
        <Grid
          container={true}
          spacing={16}
          className={classes.item}
          alignContent={'center'}
          alignItems={'center'}
          onClick={createEditLocation}
        >
          <Grid item={true}>
            <i className="material-icons">{'location_on'}</i>
          </Grid>
          <Grid item={true}>{'Sacramento'}</Grid>
          <Grid item={true} xs={8}>
            {'12345 Main Street, Suite 120, Sacramento, CA 95746'}
          </Grid>
        </Grid>
        <Grid
          container={true}
          spacing={16}
          className={classes.item}
          alignContent={'center'}
          alignItems={'center'}
          onClick={() => router.push('/admin/location/1')}
        >
          <Grid item={true}>
            <i className="material-icons">{'location_on'}</i>
          </Grid>
          <Grid item={true}>{'West Sacramento'}</Grid>
          <Grid item={true} xs={8}>
            {'12345 Main Street, Suite 120, West Sacramento, CA 95746'}
          </Grid>
        </Grid>
      </div>
    </LandingComponent>
  );
};

Locations.propTypes = {
  classes: PropTypes.shape({
    item: PropTypes.string,
  }),
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  //setNavigation: PropTypes.func,
};

export default withStyles(styles)(withRouter(Locations));
