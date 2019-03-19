import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

import Title from '../../../components/admin-site/Title';

describe('Admin-site <Title />', () => {
  it('renders snapshot of Title', () => {
    const wrapper = mount(<Title />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
