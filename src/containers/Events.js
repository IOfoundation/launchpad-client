import React, {PureComponent} from 'react';
import MainLayout from '../components/layouts/Main';
import EventsLayout from '../components/events/Events';
import {sizeCheck, viewport} from '../utils';

class Events extends PureComponent {
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
    const {width, homePage, breakpoint} = this.state;

    return (
      <MainLayout windowWidth={width} homePage={homePage}>
        <EventsLayout breakpoint={breakpoint} />
      </MainLayout>
    );
  }
}

export default Events;
