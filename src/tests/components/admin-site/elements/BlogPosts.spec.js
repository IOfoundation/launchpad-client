import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
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
const mockStore = configureStore([thunk]);
let store;

describe('Admin-site <BlogPosts />', () => {
  it('renders snapshot of BlogPosts', () => {
    store = mockStore({});
    const wrapper = shallow(
      <MuiThemeProvider theme={muiTheme}>
        <Provider store={store}>
          <BlogPosts {...props} />
        </Provider>
      </MuiThemeProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
