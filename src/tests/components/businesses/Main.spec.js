import React from 'react';
import {shallow} from 'enzyme';

import BusinessesView from '../../../components/businesses/Main';

const locations = [];
const organizations = [
  { id: 1, name: 'organization 1' },
  { id: 2, name: 'organization 2' }
];
const businessesMetadata = {};
const filters = {
  businessServices: [],
  businessTypes: [0: {}, 1: {}, 2: {},],
  stages: [],
  communities: [],
};
const displayOptions = {
  showBusinessTypes: true,
  locationToggleSwitch: false
};

const checkBusinessType = jest.fn();
const checkLocationToggle = jest.fn();
const handleChangePage = jest.fn();
const handleClickOnClearAllFilters = jest.fn();
const handleOnChangeFilterOptions = jest.fn();
const onClick = jest.fn();

describe('<BusinessesView />', () => {
  it('Renders a BusinessesList component', () => {
    const wrapper = shallow(
      <BusinessesView
        displayOptions={displayOptions}
        filterOptions={filters}
        organizations={organizations}
        locations={locations}
        businessesMetadata={businessesMetadata}
        checkBusinessType={checkBusinessType}
        checkLocationToggle={checkLocationToggle}
        handleChangePage={handleChangePage}
        handleClickOnClearAllFilters={handleClickOnClearAllFilters}
        handleOnChangeFilterOptions={handleOnChangeFilterOptions}
      />
    );
    expect(wrapper.find('BusinessesList').length).toEqual(1);
  });

  it('Renders a Pagination component', () => {
    const wrapper = shallow(
      <BusinessesView
        displayOptions={displayOptions}
        filterOptions={filters}
        organizations={organizations}
        locations={locations}
        businessesMetadata={businessesMetadata}
        checkBusinessType={checkBusinessType}
        checkLocationToggle={checkLocationToggle}
        handleChangePage={handleChangePage}
        handleClickOnClearAllFilters={handleClickOnClearAllFilters}
        handleOnChangeFilterOptions={handleOnChangeFilterOptions}
      />
    );
    expect(wrapper.find('Pagination').length).toEqual(1);
  });

  it('Renders a ContentMap component', () => {
    const wrapper = shallow(
      <BusinessesView
        displayOptions={displayOptions}
        filterOptions={filters}
        organizations={organizations}
        locations={locations}
        businessesMetadata={businessesMetadata}
        checkBusinessType={checkBusinessType}
        checkLocationToggle={checkLocationToggle}
        handleChangePage={handleChangePage}
        handleClickOnClearAllFilters={handleClickOnClearAllFilters}
        handleOnChangeFilterOptions={handleOnChangeFilterOptions}
      />
    );
    expect(wrapper.find('ContentMap').length).toEqual(1);
  });

  it('Renders resultsInfo component', () => {
    const wrapper = shallow(
      <BusinessesView
        displayOptions={displayOptions}
        filterOptions={filters}
        organizations={organizations}
        locations={locations}
        businessesMetadata={businessesMetadata}
        checkBusinessType={checkBusinessType}
        checkLocationToggle={checkLocationToggle}
        handleChangePage={handleChangePage}
        handleClickOnClearAllFilters={handleClickOnClearAllFilters}
        handleOnChangeFilterOptions={handleOnChangeFilterOptions}
      />
    );
    expect(wrapper.find('ContentMap').exists('ResultsInfo')).toBe(true);
  });
});
