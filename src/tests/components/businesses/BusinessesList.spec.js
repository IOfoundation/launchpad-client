import React from 'react';
import {shallow} from 'enzyme';

import BusinessesList from '../../../components/businesses/BusinessesList';

const handleClickOnClearAllFilters = jest.fn();

function mockMultipleOrganizations() {
  return [
    {
      id: 1,
      name: 'Businesses1',
    },
    {
      id: 2,
      name: 'Businesses2',
    },
  ];
}

describe('<BusinessesList />', () => {
  it('Renders empty state', () => {
    const organizations = emptyOrganizations();
    const wrapper = shallow(
      <BusinessesList
        organizations={organizations}
        handleClickOnBusiness={handleClickOnBusiness}
        handleClickOnClearAllFilters={handleClickOnClearAllFilters}
      />
    );
    expect(wrapper.find('.no-result-message-show'));
  });

  it('Renders expanded Business component when only one Org in the array', () => {
    const organizations = mockSingleOrganization();
    const wrapper = shallow(
      <BusinessesList
        organizations={organizations}
        handleClickOnBusiness={handleClickOnBusiness}
        handleClickOnClearAllFilters={handleClickOnClearAllFilters}
      />
    );
    expect(wrapper.find('Business').prop('expanded')).toEqual(true);
  });

  it('Renders a Business component for every Org in the array', () => {
    const organizations = mockMultipleOrganizations();
    const isMobile = false;
    const wrapper = shallow(
      <BusinessesList
        organizations={organizations}
        handleClickOnClearAllFilters={handleClickOnClearAllFilters}
        isMobile={isMobile}
      />
    );
    expect(wrapper.find('Business').length).toEqual(2);
  });
});
