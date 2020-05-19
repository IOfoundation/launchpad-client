import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import Category from '../../../components/blog/Category';

const clicked = jest.fn();
const props = {
  className: 'testing-class',
  clicked,
  isSelected: false,
  label: 'Testing Label',
};

describe('<Category />', () => {
  it('renders snapshot of Category', () => {
    const wrapper = shallow(<Category {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should execute clicked function', () => {
    const wrapper = shallow(<Category {...props} />);
    const component = wrapper.find('.testing-class');

    component.simulate('click');

    expect(clicked.mock.calls.length).toEqual(1);
  });
});
