import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import PostListItem from '../../../components/blog/PostListItem';

const props = {
  date: '05/09/2019',
  description: 'testing description',
  tag: 'tag',
  title: 'title',
};

describe('<PostListItem />', () => {
  it('renders snapshot of Category', () => {
    const wrapper = shallow(<PostListItem {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
