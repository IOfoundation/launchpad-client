import React from 'react';
import {shallow} from 'enzyme';

import BusinessView from '../../../components/business/Main';

function mockBusiness() {
  return {
    id: 1,
    name: 'Businesses1',
    description: 'Lorem Ipsum ...',
    location: {
      latitude: 0,
      longitude: 0,
    },
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
            name: 'Stage1',
          },
          {
            id: 1,
            name: 'Stage1',
          },
        ],
      },
    ],
  };
}

describe('<BusinessView />', () => {
  it('Renders the name of the Business', () => {
    const businessItem = mockBusiness();
    const wrapper = shallow(<BusinessView business={businessItem} />);
    expect(wrapper.contains('Businesses1')).toBe(true);
  });

  it('Renders the description of the Business', () => {
    const businessItem = mockBusiness();
    const wrapper = shallow(<BusinessView business={businessItem} />);
    expect(wrapper.contains('Lorem Ipsum ...')).toBe(true);
  });
});
