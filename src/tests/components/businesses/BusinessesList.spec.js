import React from 'react';
import {shallow} from 'enzyme';

import BusinessesList from '../../../components/businesses/BusinessesList';

const handleClickOnBusiness = jest.fn();

function mockOrganizations() {
  return [
    {
      id: 1,
      name: 'Businesses1',
    },
    {
      id: 1,
      name: 'Businesses2',
    },
  ];
}

describe('<BusinessesList />', () => {
  it('Renders a Business component for every Business in the array', () => {
    const organizations = mockOrganizations();
    const wrapper = shallow(
      <BusinessesList
        organizations={organizations}
        handleClickOnBusiness={handleClickOnBusiness}
      />
    );
    expect(wrapper.find('Business').length).toEqual(2);
  });
});
