import React, {PureComponent, cloneElement} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

import AdminLayout from '../../components/layouts/Admin';

import {viewport, sizeCheck} from '@Utils';

class Layout extends PureComponent {
  state = {
    breakpoint: '',
    homePage: false,
    listener: () => sizeCheck(this.handleWindowSizeChange),
    width: viewport().width,
  };

  componentDidMount() {
    window.addEventListener('resize', this.state.listener);
    sizeCheck(this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.listener);
  }

  handleWindowSizeChange = breakpoint => {
    this.setState({breakpoint, width: viewport().width});
  };

  render() {
    const {width, homePage, breakpoint} = this.state;
    const {hideFooter} = this.props;

    return (
      <AdminLayout
        windowWidth={width}
        homePage={homePage}
        hideFooter={hideFooter}
      >
        {cloneElement(this.props.children, {breakpoint})}
      </AdminLayout>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  hideFooter: PropTypes.bool,
};

const mapStateToProps = _state => {
  return {
    hideFooter: _state.adminBlogs.hideFooter,
  };
};

export default connect(mapStateToProps)(Layout);
