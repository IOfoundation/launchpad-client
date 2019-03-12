import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PropTypes} from 'prop-types';

import * as userActions from '../../actions/user';
import Layout from '../Layout';
import SigIn from '../../components/admin-login/SigIn';

class SignInRoute extends PureComponent {
  componentDidMount() {
    if (this.props.error) {
      this.props.user.resetError();
    }
  }

  render() {
    return (
      <Layout>
        <SigIn />
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

SignInRoute.propTypes = {
  error: PropTypes.bool,
  user: PropTypes.shape({
    resetError: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInRoute);
