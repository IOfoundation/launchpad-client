import React, {PureComponent} from 'react';
import MainLayout from '../components/layouts/Main';
import BusinessDetailsContent from '../components/businesses/BusinessDetails';

class BusinessDetails extends PureComponent {
  state = {
    width: window.innerWidth,
    homePage: false,
  };

  render() {
    const {width, homePage} = this.state;

    return (
      <MainLayout windowWidth={width} homePage={homePage}>
        <BusinessDetailsContent />
      </MainLayout>
    );
  }
}

export default BusinessDetails;
