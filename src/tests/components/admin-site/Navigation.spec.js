import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

import Navigation from '../../../components/admin-site/Navigation';

const props = {
  location: {
    pathname: '/admin/profile',
  },
};

describe('Admin-site <Navigation />', () => {
  it('renders snapshot of Navigation', () => {
    const wrapper = mount(<Navigation {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
