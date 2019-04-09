import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';

export const Buttons = props => {
  const {
    cancelClicked,
    classes,
    disableSubmit,
    extraClicked,
    extraLabel,
    hideCancelAction = true,
    submitClicked,
    submitLabel = 'Save Changes',
  } = props;

  return (
    <div className={classes.Buttons}>
      {hideCancelAction ? null : (
        <a className="title-as-link m-right-24" onClick={cancelClicked}>
          {'Cancel'}
        </a>
      )}
      {extraLabel && (
        <button
          className="btn btn__black m-right-16"
          onClick={extraClicked}
          type="button"
        >
          {extraLabel}
        </button>
      )}
      <button
        className="btn btn__submit margin-0"
        onClick={submitClicked}
        type="button"
        disabled={disableSubmit}
      >
        {submitLabel}
      </button>
    </div>
  );
};

const styles = theme => {
  return {
    Buttons: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: '28px',
      '& .btn': {
        width: 'auto',
        padding: '9px 25px',
        fontSize: '14px',
        fontFamily: '"proxima-nova-semi", Georgia, sans-serif',
      },
      '& a': {
        color: '#7B7C7E',
      },
    },
    [theme.breakpoints.down('sm')]: {
      Buttons: {
        '& .btn': {
          padding: '9px 16px',
        },
      },
    },
  };
};

Buttons.propTypes = {
  cancelClicked: PropTypes.func,
  classes: PropTypes.shape({
    Buttons: PropTypes.string,
  }),
  disableSubmit: PropTypes.bool,
  extraClicked: PropTypes.func,
  extraLabel: PropTypes.string,
  hideCancelAction: PropTypes.bool,
  submitClicked: PropTypes.func,
  submitLabel: PropTypes.string.isRequired,
};

export default withStyles(styles)(Buttons);
