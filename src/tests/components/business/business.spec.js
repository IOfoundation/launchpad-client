import React from 'react';
import {shallow} from 'enzyme';

import BusinessView from '../../../components/business/Main';
import MapView from '../../../components/map-view/Main';

function mockBusiness() {
  return {
    id: 1,
    name: 'Businesses1',
    description: 'Lorem Ipsum ...',
    Services: [
      {
        id: 1,
        name: 'Service1',
      },
      {
        id: 1,
        name: 'Service2',
      },
    ],
    Communities: [
      {
        id: 1,
        name: 'Community1',
      },
      {
        id: 1,
        name: 'Community2',
      },
    ],
    Stages: [
      {
        id: 1,
        name: 'Community1',
      },
      {
        id: 1,
        name: 'Community2',
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

  it('Renders a list of services offered', () => {
    const businessItem = mockBusiness();
    const wrapper = shallow(<BusinessView business={businessItem} />);
    expect(wrapper.find('.services').length).toEqual(2);
  });

  it('Renders a MapView component', () => {
    const businessItem = mockBusiness();
    const wrapper = shallow(<BusinessView business={businessItem} />);
    expect(wrapper.find(MapView).length).toEqual(1);
  });
});
