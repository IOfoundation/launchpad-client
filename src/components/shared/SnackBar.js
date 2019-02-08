import React from 'react';
// import {Snackbar} from 'material-ui';
import {withStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/snackbar';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

const SnackbarUI = props => {
  const {message, action, autoHideDuration, visibility} = props;

  const style = {
    bottom: '10px',
  };

  return (
    <Snackbar
      open={visibility}
      message={<span id="snackbar__message">{message}</span>}
      action={
        <Button
          onClick={() => {
            props.actions.hideSnackbar();
          }}
          className="snackbar__action"
          size="small"
          aria-label="Close"
          color="inherit"
        >
          {action}
        </Button>
      }
      autoHideDuration={autoHideDuration}
      onClose={() => {
        props.actions.hideSnackbar();
      }}
      style={style}
      className="snackbar"
    />
  );
};

SnackbarUI.propTypes = {
  action: PropTypes.string,
  actions: PropTypes.shape({
    showSnackbar: PropTypes.func.isRequired,
    hideSnackbar: PropTypes.func.isRequired,
  }),
  autoHideDuration: PropTypes.number,
  message: PropTypes.string,
  visibility: PropTypes.bool,
};

const mapStateToProps = _state => {
  const {snackbar} = _state;

  return {
    visibility: snackbar.visibility,
    message: snackbar.message,
    autoHideDuration: snackbar.autoHideDuration,
    action: snackbar.actionText,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    actions: bindActionCreators(actions, _dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SnackbarUI));
