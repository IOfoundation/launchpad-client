import React from 'react';
import { shallow } from 'enzyme';

import BusinessesList from './BusinessesList';

function mockBusinesses(overrides) {
  return [
    {
      id: 1,
      name: 'Businesses1'
    },
    {
      id: 1,
      name: 'Businesses2'
    }
  ]
}

describe('<BusinessesList />', () => {
  it('Renders a Business component for every Bussiness in the array', () => {
    const Businesses = mockBusinesses();
    const wrapper = shallow(<BusinessesList businesses={Businesses} />);
    expect(wrapper.find('Business').length).toEqual(2);
  });
});
