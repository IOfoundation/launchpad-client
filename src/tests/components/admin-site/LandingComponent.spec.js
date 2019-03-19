import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

import LandingComponent from '../../../components/admin-site/Landing';

describe('Admin-site <LandingComponent />', () => {
  it('renders snapshot of LandingComponent', () => {
    const wrapper = mount(<LandingComponent />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
