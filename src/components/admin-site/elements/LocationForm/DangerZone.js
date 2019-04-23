import React from 'react';
import {PropTypes} from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import {sharedStyles} from './styles';

import {combineStyles} from '@Utils';

const styles = theme => {
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
      maxWidth: '424px',
      width: '70%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  };
};

const DangerZone = props => {
  const {classes, deleteClicked, name = 'LOCATION'} = props;
  const lowerCase = name.toLowerCase();
  const upperCase = name.toUpperCase();

  return (
    <div className={classes.card}>
      <div className={classes.cardTitle}>
        <span className={`${classes.cardTitle}__media`}>{'Danger Zone'}</span>
      </div>
      <div className={classes.cardContent}>
        <Grid container={true} spacing={16}>
          <Grid item={true} xs={12}>
            <p className={classes.dangerTitle}>
              {'Delete this '}
              <span className="capitalize">{lowerCase}</span>
            </p>
            <p
              className={classes.dangerDescription}
            >{`Once you delete a ${lowerCase}, there is no going back. Please be certain.`}</p>
            <button
              className={`btn btn__red ${classes.dangerButton}`}
              onClick={deleteClicked}
              type="button"
            >
              {`PERMANENTLY DELETE THIS ${upperCase}`}
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
  deleteClicked: PropTypes.func,
  name: PropTypes.string,
};

export default withStyles(combineStyles(sharedStyles, styles))(DangerZone);
