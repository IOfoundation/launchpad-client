import React, {PureComponent} from 'react';
import MainLayout from '../components/layouts/Main';
import EventsLayout from '../components/events/Events';

class Events extends PureComponent {
  state = {
    width: window.innerWidth,
    homePage: false,
  };

  render() {
    const {width, homePage} = this.state;

    return (
      <MainLayout windowWidth={width} homePage={homePage}>
        <EventsLayout />
      </MainLayout>
    );
  }
}

export default Events;
