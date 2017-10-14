import React from 'react';
import {shallow} from 'enzyme';

import BusinessesList from '../../../components/businesses/BusinessesList';

const handleClickOnBusiness = jest.fn();
const handleClickOnClearAllFilters = jest.fn();

function mockSingleOrganization() {
  return {id: 1, name: 'Business1'};
}

function singleEmptyOrganization() {
  return {};
}

function mockMultipleOrganizations() {
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
    const organizations = mockMultipleOrganizations();
    const organization = singleEmptyOrganization();
    const wrapper = shallow(
      <BusinessesList
        organizations={organizations}
        organization={organization}
        handleClickOnBusiness={handleClickOnBusiness}
        handleClickOnClearAllFilters={handleClickOnClearAllFilters}
        expanded={false}
      />
    );
    expect(wrapper.find('Business').length).toEqual(2);
  });
});
