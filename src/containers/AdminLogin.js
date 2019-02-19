import React, {PureComponent} from 'react';
import MainLayout from '../components/layouts/Main';
import {sizeCheck} from '../utils/sizeCheck';
import {viewport} from '../utils/viewPort';

class AdminLogin extends PureComponent {
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

export default AdminLogin;
