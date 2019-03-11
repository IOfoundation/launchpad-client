/* eslint-env jest */
import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

import {featuredEvents} from '../mock/featuredEvents';
import FeaturedEvents from '../../../../components/events/FeaturedEvents/FeaturedEvents';

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

const getEventsByMonth = jest.fn();

const props = {
  featuredEvents: [...featuredEvents],
  actions: {
    getEventsByMonth,
  },
};
let wrapper;

describe('<FeaturedEvents />', () => {
  beforeEach(() => {
    wrapper = mount(<FeaturedEvents {...props} />);
  });

  it('renders snapshot of FeaturedEvents', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should get events by month', () => {
    expect(getEventsByMonth).toHaveBeenCalled();
  });
});
