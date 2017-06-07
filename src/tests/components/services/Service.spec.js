import React from 'react';
import {shallow} from 'enzyme';

import Service from '../../../components/services/Service';

function mockService(overrides) {
  return {
    id: 1,
    name: 'Service1',
  };
}

const handleClickOnServiceTag = jest.fn();

describe('<ServicesBox />', () => {
  it('Render a li tag', () => {
    const serviceItem = mockService();
    const wrapper = shallow(
      <Service
        service={serviceItem}
        handleClickOnServiceTag={handleClickOnServiceTag}
      />
    );
    expect(wrapper.find('li').length).toEqual(1);
  });

  it('Render the name of the service in the li tag', () => {
    const serviceItem = mockService();
    const wrapper = shallow(
      <Service
        service={serviceItem}
        handleClickOnServiceTag={handleClickOnServiceTag}
      />
    );
    const liTag = wrapper.find('li');
    expect(liTag.text()).toEqual('Service1');
  });
});
