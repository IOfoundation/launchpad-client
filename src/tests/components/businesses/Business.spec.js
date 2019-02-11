import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import Business from '../../../components/businesses/Business';
import organizationFixture from '../../fixtures/organization';

const props = {
  isSelected: false,
  business: organizationFixture,
  isMobile: false,
  key: organizationFixture.id,
  expanded: true,
};

describe.skip('<Business />', () => {
  it('renders snapshot of Business', () => {
    const wrapper = shallow(<Business {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
