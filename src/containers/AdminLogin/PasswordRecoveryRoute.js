import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';

import Layout from '../Layout';
import PasswordRecoveryForm from '../../components/admin-login/PasswordRecovery';
import * as userActions from '@Actions/user';

class PasswordRecoveryRoute extends PureComponent {
  componentDidMount() {
    if (this.props.error) {
      this.props.user.resetError();
    }
  }

  render() {
    return (
      <Layout>
        <PasswordRecoveryForm />
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

PasswordRecoveryRoute.propTypes = {
  error: PropTypes.bool,
  user: PropTypes.shape({
    resetError: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordRecoveryRoute);
