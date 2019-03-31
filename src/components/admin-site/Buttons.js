import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {PropTypes} from 'prop-types';

export const Buttons = props => {
  const {
    classes,
    submitLabel = 'Save Changes',
    hideCancelAction = true,
    cancelClicked,
    submitClicked,
    extraClicked,
    extraLabel,
  } = props;

  return (
    <div className={classes.Buttons}>
      {hideCancelAction ? null : (
        <a className="title-as-link m-right-24" onClick={cancelClicked}>
          {'Cancel'}
        </a>
      )}
      {extraLabel && (
        <button className="btn btn__black m-right-16" onClick={extraClicked}>
          {extraLabel}
        </button>
      )}
      <button className="btn btn__submit margin-0" onClick={submitClicked}>
        {submitLabel}
      </button>
    </div>
  );
};

const styles = () => {
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
  };
};

Buttons.propTypes = {
  cancelClicked: PropTypes.func,
  classes: PropTypes.shape({
    Buttons: PropTypes.string,
  }),
  extraClicked: PropTypes.func,
  extraLabel: PropTypes.string,
  hideCancelAction: PropTypes.bool,
  submitClicked: PropTypes.func,
  submitLabel: PropTypes.string,
};

export default withStyles(styles)(Buttons);
