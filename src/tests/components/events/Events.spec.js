import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import Events from '../../../components/events/Events';
import {EVENTS} from './mock/events';

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
const props = {
  breakpoint: 'sm',
};
let store;
let wrapper;

describe('<Events />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(
      <Provider store={store}>
        <Events {...props} />
      </Provider>
    );
  });

  it('renders snapshot of Events', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
