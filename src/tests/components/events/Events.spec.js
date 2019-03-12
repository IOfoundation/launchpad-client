import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import Events from '../../../components/events/Events';
import SchedulerContainer from '../../../components/events/SchedulerContainer';

const props = {
  breakpoint: 'sm',
};

describe('<Events />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Events {...props} />);
  });

  it('renders snapshot of Events', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('SchedulerContainer', () => {
    const schedulerContainer = wrapper.find(SchedulerContainer);

    expect(schedulerContainer.props()).toEqual({breakpoint: 'sm'});
  });
});
