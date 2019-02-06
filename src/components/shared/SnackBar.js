import React, {PureComponent} from 'react';
import {Snackbar} from 'material-ui';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/snackbar';

class SnackbarUI extends PureComponent {
  render() {
    const {message, action, autoHideDuration} = this.props;

    const style = {
      bottom: '10px',
    };

    return (
      <Snackbar
        open={this.props.visibility}
        message={message}
        action={action}
        autoHideDuration={autoHideDuration}
        onActionClick={() => {
          this.props.actions.hideSnackbar();
        }}
        onRequestClose={() => {
          this.props.actions.hideSnackbar();
        }}
        style={style}
        className="snackbar-purple"
      />
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarUI);
