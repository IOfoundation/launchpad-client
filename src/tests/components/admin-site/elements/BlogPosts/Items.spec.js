import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Items from '../../../../../components/admin-site/elements/BlogPosts/Items';

import {muiTheme} from '../../../../helpers/theme';

const props = {
  items: [
    {
      id: 1,
      category: 'Category',
      date: 'date',
      description: 'description',
      label: 'label',
      title: 'title',
    },
  ],
};

describe('Admin-site <Items />', () => {
  it('renders snapshot of Items', () => {
    const wrapper = mount(
      <MuiThemeProvider theme={muiTheme}>
        <Items {...props} />
      </MuiThemeProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
