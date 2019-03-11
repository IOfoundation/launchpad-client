/* eslint-env jest */
import React from 'react';
import {mount} from 'enzyme';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

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

const initialState = {
  events: {
    data: [...EVENTS],
    featuredEvents: [],
  },
};
const mockStore = configureStore([thunk]);
const props = {};
let store;
let wrapper;

describe('<SchedulerContainer />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <SchedulerContainer {...props} />
      </Provider>
    );
  });

  it('renders snapshot of SchedulerContainer', () => {
    global.Date = jest.fn().mockReturnValue('9/5/1989');
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should get all the events', () => {
    expect(store.getActions()).toEqual([
      {type: 'GET_ALL_EVENTS_BY_MONTH_START'},
    ]);
  });
});
