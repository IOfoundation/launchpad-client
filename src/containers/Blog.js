import React, {PureComponent} from 'react';
import MainLayout from '../components/layouts/Main';
import BlogLayout from '../components/blog/Blog';

class Blog extends PureComponent {
  state = {
    width: window.innerWidth,
    homePage: false,
  };

  render() {
    const {width, homePage} = this.state;

    return (
      <MainLayout windowWidth={width} homePage={homePage}>
        <BlogLayout />
      </MainLayout>
    );
  }
}

export default Blog;
