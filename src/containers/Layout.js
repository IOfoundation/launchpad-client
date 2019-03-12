import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import MainLayout from '../components/layouts/Main';
import {viewport, sizeCheck} from '../utils';

class Layout extends PureComponent {
  state = {
    breakpoint: '',
    homePage: false,
    listener: () => sizeCheck(this.handleWindowSizeChange),
    width: viewport().width,
  };

  componentDidMount() {
    window.addEventListener('resize', this.state.listener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.listener);
  }

  handleWindowSizeChange = breakpoint => {
    this.setState({breakpoint, width: viewport().width});
  };

  render() {
    const {width, homePage} = this.state;

    return (
      <MainLayout windowWidth={width} homePage={homePage}>
        {this.props.children}
      </MainLayout>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
