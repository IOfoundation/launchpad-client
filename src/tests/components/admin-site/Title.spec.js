import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

import Title from '../../../components/admin-site/Title';

const props = {
  submitClicked: jest.fn(),
  submitLabel: 'label',
};

describe('Admin-site <Title />', () => {
  it('renders snapshot of Title', () => {
    const wrapper = mount(<Title {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
