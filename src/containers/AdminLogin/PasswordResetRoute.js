import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';

import Layout from '../Layout';
import PasswordReset from '../../components/admin-login/PasswordReset';
import * as userActions from '../../actions/user';

class PasswordResetRoute extends PureComponent {
  componentDidMount() {
    if (this.props.error) {
      this.props.user.resetError();
    }
  }

  render() {
    return (
      <Layout>
        <PasswordReset />
      </Layout>
    );
  }
}

const mapStateToProps = _state => {
  return {
    error: _state.user.error,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    user: bindActionCreators(userActions, _dispatch),
  };
};

PasswordResetRoute.propTypes = {
  error: PropTypes.bool,
  user: PropTypes.shape({
    resetError: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetRoute);
