import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import BlogPosts from '../../../../components/admin-site/elements/BlogPosts';

import {muiTheme} from '../../../helpers/theme';

const props = {
  location: {
    pathname: '/admin/profile',
  },
};
const initialState = {
  adminBlogs: {
    drafts: {
      data: [],
      noResults: false,
      page: 1,
      totalPages: 0,
    },
    posted: {
      data: [],
      noResults: false,
      page: 1,
      totalPages: 0,
    },
  },
};
const mockStore = configureStore([thunk]);
let store;
let wrapper;

describe('Admin-site <BlogPosts />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
          <BlogPosts {...props} />
        </MuiThemeProvider>
      </Provider>
    );
  });

  it('renders snapshot of BlogPosts', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
