import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {sharedStyles} from './styles';
import Grid from '@material-ui/core/Grid';

import {combineStyles} from '../../../../utils';

const styles = () => {
  return {
    dangerTitle: {
      color: 'black',
      fontFamily: '"proxima-nova-bold", Georgia, sans-serif',
      fontSize: '14px',
      lineHeight: '20px',
    },
    dangerDescription: {
      color: 'black',
      fontSize: '12px',
      lineHeight: '16px',
      marginBottom: '10px',
      opacity: 0.5,
    },
    dangerButton: {
      maxWidth: '70%',
    },
  };
};

const DangerZone = props => {
  const {classes} = props;

  return (
    <div className={classes.card}>
      <div className={classes.cardTitle}>
        <span className={`${classes.cardTitle}__media`}>{'Danger Zone'}</span>
      </div>
      <div className={classes.cardContent}>
        <Grid container={true} spacing={16}>
          <Grid item={true} xs={12}>
            <p className={classes.dangerTitle}>{'Delete this Location'}</p>
            <p className={classes.dangerDescription}>
              {
                'Once you delete a location, there is no going back. Please be certain.'
              }
            </p>
            <button className={`btn btn__red ${classes.dangerButton}`}>
              {'PERMANENTLY DELETE THIS LOCATION'}
            </button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

DangerZone.propTypes = {
  classes: PropTypes.shape({
    card: PropTypes.string,
    cardContent: PropTypes.string,
    cardTitle: PropTypes.string,
    dangerButton: PropTypes.string,
    dangerDescription: PropTypes.string,
    dangerTitle: PropTypes.string,
  }),
};

export default withStyles(combineStyles(sharedStyles, styles))(DangerZone);
