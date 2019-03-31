import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import LandingComponent from '../../../components/admin-site/Landing';

const initialState = {
  snackbar: {
    visibility: false,
    message: 'placeholder message',
    autoHideDuration: 10000,
    actionText: 'DISMISS',
  },
};
const mockStore = configureStore([thunk]);
const props = {};
let store;
let wrapper;

describe('Admin-site <LandingComponent />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <LandingComponent {...props} />
      </Provider>
    );
  });

  it('renders snapshot of LandingComponent', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
