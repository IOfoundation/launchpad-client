import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import Navigation from '../../../components/admin-site/Navigation';

const initialState = {
  adminProfile: {
    updatedOrganization: {
      data: [],
      loading: false,
      success: false,
      errors: [],
    },
    publishStatus: null,
    publishSuccess: false,
    publishLoading: false,
    publishErrors: [],
  },
  user: {
    organizationId: 1,
  },
  businesses: {
    organization: {},
  },
};
const mockStore = configureStore([thunk]);
let store;
let wrapper;
const props = {
  location: {
    pathname: '/admin/profile',
  },
};

describe('Admin-site <Navigation />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Navigation {...props} />
      </Provider>
    );
  });

  it('renders snapshot of Navigation', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
