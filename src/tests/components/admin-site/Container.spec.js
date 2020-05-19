import React from 'react';
import {mount} from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import toJson from 'enzyme-to-json';

import Container from '../../../components/admin-site/Container';

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

describe('Admin-site <Container />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Container {...props} />
      </Provider>
    );
  });

  it('renders snapshot of Container', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
