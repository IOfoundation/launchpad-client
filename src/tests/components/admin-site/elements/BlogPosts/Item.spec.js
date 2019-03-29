import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Item from '../../../../../components/admin-site/elements/BlogPosts/Item';

import {muiTheme} from '../../../../helpers/theme';

const props = {
  category: 'Category',
  date: 'date',
  description: 'description',
  label: 'label',
  title: 'title',
};

describe('Admin-site <Item />', () => {
  it('renders snapshot of Item', () => {
    const wrapper = mount(
      <MuiThemeProvider theme={muiTheme}>
        <Item {...props} />
      </MuiThemeProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
