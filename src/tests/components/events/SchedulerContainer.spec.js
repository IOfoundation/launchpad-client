/* eslint-env jest */
import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

import {EVENTS} from './mock/events';
import SchedulerContainer from '../../../components/events/SchedulerContainer';

jest.useFakeTimers();
/*eslint-disable */
Date.now = jest.fn(() => new Date(Date.UTC(2019, 0, 1, 0, 0, 0)));
Date = class extends Date {
  constructor(date) {
    if (date) {
      return super(date);
    }
    return new Date('05-08-89');
  }
};
/*eslint-enable */

const getAllEventsByMonth = jest.fn();
const props = {
  events: {data: [...EVENTS], loading: false},
  actions: {
    getAllEventsByMonth,
  },
};
let wrapper;

describe('<SchedulerContainer />', () => {
  beforeEach(() => {
    wrapper = mount(<SchedulerContainer {...props} />);
  });

  it('renders snapshot of SchedulerContainer', () => {
    global.Date = jest.fn().mockReturnValue('9/5/1989');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should get all the events', () => {
    expect(getAllEventsByMonth).toHaveBeenCalled();
  });
});
