import React from 'react';
import {shallow} from 'enzyme';

import BusinessesPage from '../../../components/businesses/Main';

const locations = [];
const organizations = [];
const businessesMetadata = {};
const filters = {
  businessServices: [],
  businessTypes: [('0': {}), ('1': {}), ('2': {})],
  stages: [],
  communities: [],
};

const handleChangePage = jest.fn();
const handleClickOnBusiness = jest.fn();
const handleClickOnClearAllFilters = jest.fn();
const handleOnChangeFilterOptions = jest.fn();

describe('<BusinessesPage />', () => {
  it('Renders a BusinessesList component', () => {
    const wrapper = shallow(
      <BusinessesPage
        filterOptions={filters}
        locations={locations}
        organizations={organizations}
        businessesMetadata={businessesMetadata}
        handleChangePage={handleChangePage}
        handleClickOnBusiness={handleClickOnBusiness}
        handleClickOnClearAllFilters={handleClickOnClearAllFilters}
        handleOnChangeFilterOptions={handleOnChangeFilterOptions}
      />
    );
    expect(wrapper.find('BusinessesList').length).toEqual(1);
  });

  it('Renders a Pagination component', () => {
    const wrapper = shallow(
      <BusinessesPage
        filterOptions={filters}
        locations={locations}
        organizations={organizations}
        businessesMetadata={businessesMetadata}
        handleChangePage={handleChangePage}
        handleClickOnBusiness={handleClickOnBusiness}
        handleClickOnClearAllFilters={handleClickOnClearAllFilters}
        handleOnChangeFilterOptions={handleOnChangeFilterOptions}
      />
    );
    expect(wrapper.find('Pagination').length).toEqual(1);
  });
});
