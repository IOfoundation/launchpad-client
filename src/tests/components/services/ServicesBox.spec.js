import React from 'react';
import {shallow} from 'enzyme';

import ServicesBox from '../../../components/services/ServicesBox';

function mockServices(overrides) {
  return [
    {
      id: 1,
      name: 'Service1',
    },
    {
      id: 1,
      name: 'Service2',
    },
  ];
}

describe('<ServicesBox />', () => {
  it('Renders a Service component for every Service in the array', () => {
    const Services = mockServices();
    const wrapper = shallow(<ServicesBox services={Services} />);
    expect(wrapper.find('Service').length).toEqual(2);
  });
});
