import React from 'react';
import {shallow} from 'enzyme';

import Business from '../../../components/businesses/Business';

const handleClickOnBusiness = jest.fn();

function mockBusiness() {
  return {
    id: 1,
    name: 'Businesses1',
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

describe('<Business />', () => {
  it('Renders the name of the Business', () => {
    const businessItem = mockBusiness();
    const wrapper = shallow(
      <Business
        business={businessItem}
        handleClickOnBusiness={handleClickOnBusiness}
      />
    );
    expect(wrapper.contains(<h3>Businesses1</h3>)).toBe(true);
  });

  it('Renders a service span for every service of a Business', () => {
    const businessItem = mockBusiness();
    const wrapper = shallow(
      <Business
        business={businessItem}
        handleClickOnBusiness={handleClickOnBusiness}
      />
    );
    expect(wrapper.find('.service').length).toBe(2);
  });

  it('Renders a community span for every community of a Business', () => {
    const businessItem = mockBusiness();
    const wrapper = shallow(
      <Business
        business={businessItem}
        handleClickOnBusiness={handleClickOnBusiness}
      />
    );
    expect(wrapper.find('.community').length).toBe(2);
  });
});
