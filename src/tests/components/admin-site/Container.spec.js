import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

import Container from '../../../components/admin-site/Container';

describe('Admin-site <Container />', () => {
  it('renders snapshot of Container', () => {
    const wrapper = mount(<Container />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
