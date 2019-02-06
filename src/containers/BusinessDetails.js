import React, {PureComponent} from 'react';
import MainLayout from '../components/layouts/Main';

class BusinessDetails extends PureComponent {
  state = {
    width: window.innerWidth,
    homePage: false,
  };

  render() {
    const {width, homePage} = this.state;

    return (
      <MainLayout windowWidth={width} homePage={homePage}>
        <p>{'BusinessDetails works'}</p>
      </MainLayout>
    );
  }
}

export default BusinessDetails;
