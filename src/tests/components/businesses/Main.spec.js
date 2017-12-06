import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import BusinessesView from '../../../components/businesses/Main';

const businesses = {
  locations: [],
  organizations: [
    {id: 1, name: 'organization 1'},
    {id: 2, name: 'organization 2'},
  ],
  items: [],
  metadata: {},
  filters: {
    businessServices: [],
    businessTypes: [(0: {}), (1: {}), (2: {})],
    stages: [],
    communities: [],
  },
  displayOptions: {
    showBusinessTypes: true,
    locationToggleSwitch: false,
  },
};

const isMobile = false;
const showLoading = false;

const handleOnChangeBusinessType = jest.fn();
const handleOnChangeLocationToggle = jest.fn();
const handleChangePage = jest.fn();
const handleClickOnClearAllFilters = jest.fn();
const handleOnChangeFilterOptions = jest.fn();

describe('<BusinessesView />', () => {
  it('Renders a ContentMap component', () => {
    const wrapper = shallow(
      <BusinessesView
        isMobile={isMobile}
        businesses={businesses}
        showLoading={showLoading}
        handleOnChangeBusinessType={handleOnChangeBusinessType}
        handleOnChangeLocationToggle={handleOnChangeLocationToggle}
        handleChangePage={handleChangePage}
        handleClickOnClearAllFilters={handleClickOnClearAllFilters}
        handleOnChangeFilterOptions={handleOnChangeFilterOptions}
      />
    );
    expect(wrapper.find('ContentMap').length).to.equal(1);
  });

  it('Renders a BusinessesList component', () => {
    const wrapper = shallow(
      <BusinessesView
        isMobile={isMobile}
        businesses={businesses}
        showLoading={showLoading}
        handleOnChangeBusinessType={handleOnChangeBusinessType}
        handleOnChangeLocationToggle={handleOnChangeLocationToggle}
        handleChangePage={handleChangePage}
        handleClickOnClearAllFilters={handleClickOnClearAllFilters}
        handleOnChangeFilterOptions={handleOnChangeFilterOptions}
      />
    );
    expect(wrapper.find('BusinessesList').length).to.equal(1);
  });

  it('Renders a Pagination component', () => {
    const wrapper = shallow(
      <BusinessesView
        isMobile={isMobile}
        businesses={businesses}
        showLoading={showLoading}
        handleOnChangeBusinessType={handleOnChangeBusinessType}
        handleOnChangeLocationToggle={handleOnChangeLocationToggle}
        handleChangePage={handleChangePage}
        handleClickOnClearAllFilters={handleClickOnClearAllFilters}
        handleOnChangeFilterOptions={handleOnChangeFilterOptions}
      />
    );
    expect(wrapper.find('Pagination').length).to.equal(1);
  });

  it('Renders resultsInfo component', () => {
    const wrapper = shallow(
      <BusinessesView
        isMobile={isMobile}
        businesses={businesses}
        showLoading={showLoading}
        handleOnChangeBusinessType={handleOnChangeBusinessType}
        handleOnChangeLocationToggle={handleOnChangeLocationToggle}
        handleChangePage={handleChangePage}
        handleClickOnClearAllFilters={handleClickOnClearAllFilters}
        handleOnChangeFilterOptions={handleOnChangeFilterOptions}
      />
    );
    expect(wrapper.find('ContentMap').exists('ResultsInfo')).to.equal(true);
  });
});
