import React, {PureComponent} from 'react';
import MainLayout from '../components/layouts/Main';
import BlogLayout from '../components/blog/Blog';
import {viewport, sizeCheck} from '../utils';

class Blog extends PureComponent {
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

    return (
      <MainLayout windowWidth={width} homePage={homePage}>
        <BlogLayout breakpoint={breakpoint} />
      </MainLayout>
    );
  }
}

export default Blog;
