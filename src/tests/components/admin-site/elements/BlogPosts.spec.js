import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import BlogPosts from '../../../../components/admin-site/elements/BlogPosts';

import {muiTheme} from '../../../helpers/theme';

const props = {
  router: {
    push: jest.fn(),
  },
};

describe('Admin-site <BlogPosts />', () => {
  it('renders snapshot of BlogPosts', () => {
    const wrapper = mount(
      <MuiThemeProvider theme={muiTheme}>
        <BlogPosts {...props} />
      </MuiThemeProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
