import React from 'react';
import {shallow} from 'enzyme';

import Business from '../../../components/businesses/Business';

function mockBusiness() {
  return {
    id: 1,
    name: 'Businesses1',
    locations: [],
    categories: [
      {
        name: 'BusinessType',
        children: [
          {
            id: 1,
            name: 'Service1',
          },
          {
            id: 1,
            name: 'Service2',
          },
        ],
      },
      {
        name: 'Community',
        children: [
          {
            id: 1,
            name: 'Community1',
          },
          {
            id: 1,
            name: 'Community2',
          },
        ],
      },
      {
        name: 'Stage',
        children: [
          {
            id: 1,
            name: 'Community1',
          },
          {
            id: 1,
            name: 'Community2',
          },
        ],
      },
    ],
  };
}

describe('<Business />', () => {
  it('Renders the name of the Business', () => {
    const businessItem = mockBusiness();
    const wrapper = shallow(
      <Business
        business={businessItem}
      />
    );
    expect(wrapper.contains('Businesses1')).toBe(true);
  });
});
