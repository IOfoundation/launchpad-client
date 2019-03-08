import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import FeaturedPost from '../../../components/blog/FeaturedPost';

const props = {
  description: 'testing description',
  imageSrc: 'testimage',
  title: 'title',
};

describe('<FeaturedPost />', () => {
  it('renders snapshot of Category', () => {
    const wrapper = shallow(<FeaturedPost {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
