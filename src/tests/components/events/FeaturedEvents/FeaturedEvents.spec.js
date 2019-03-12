/* eslint-env jest */
import React from 'react';
import {mount} from 'enzyme';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

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

const initialState = {
  events: {
    featuredEvents: [...featuredEvents],
  },
};
const mockStore = configureStore([thunk]);
const props = {};
let store;
let wrapper;

describe('<FeaturedEvents />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <FeaturedEvents {...props} />
      </Provider>
    );
  });

  it('renders snapshot of FeaturedEvents', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should get all the events', () => {
    expect(store.getActions()).toEqual([{type: 'GET_EVENTS_BY_MONTH_START'}]);
  });
});
