import React, {PureComponent, cloneElement} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import AdminLayout from '../../components/layouts/Admin';

import {viewport, sizeCheck} from '@Utils';
import * as snackbarActions from '@Actions/snackbar';

class Layout extends PureComponent {
  state = {
    breakpoint: '',
    homePage: false,
    listener: () => sizeCheck(this.handleWindowSizeChange),
    width: viewport().width,
  };

  componentDidMount() {
    const {auth, router, snackbar} = this.props;

    window.addEventListener('resize', this.state.listener);
    sizeCheck(this.handleWindowSizeChange);

    if (auth === false) {
      router.push('/admin-login');
      snackbar.showSnackbar({
        message: 'Unauthorized, please login again',
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.listener);
  }

  handleWindowSizeChange = breakpoint => {
    this.setState({breakpoint, width: viewport().width});
  };

  render() {
    const {width, homePage, breakpoint} = this.state;
    const {auth, hideFooter} = this.props;
    let adminSiteSection = null;

    if (auth) {
      adminSiteSection = (
        <AdminLayout
          windowWidth={width}
          homePage={homePage}
          hideFooter={hideFooter}
        >
          {cloneElement(this.props.children, {breakpoint})}
        </AdminLayout>
      );
    }

    return adminSiteSection;
  }
}

const mapStateToProps = _state => {
  const auth = _state.user.authorization || localStorage.getItem('userAuth');
  return {
    auth: auth !== '',
    hideFooter: _state.adminBlogs.hideFooter,
  };
};

const mapDispatchToProps = _dispatch => {
  return {
    snackbar: bindActionCreators(snackbarActions, _dispatch),
  };
};

Layout.propTypes = {
  auth: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  hideFooter: PropTypes.bool,
  router: PropTypes.shape({
    push: PropTypes.func,
  }),
  snackbar: PropTypes.shape({
    showSnackbar: PropTypes.func,
  }),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
