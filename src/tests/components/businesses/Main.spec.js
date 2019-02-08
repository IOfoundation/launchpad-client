import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import Main from '../../../components/businesses/Main';
import organizationFixture from '../../fixtures/organization';
import filtersFixture from '../../fixtures/filters';

const businesses = {
  locations: [],
  organizations: [organizationFixture, organizationFixture],
  items: [],
  metadata: {},
  filters: filtersFixture,
  displayOptions: {
    showBusinessTypes: true,
    locationToggleSwitch: false,
  },
  appliedFilters: {
    page: 1,
  },
};

const props = {
  isMobile: false,
  businesses,
  showLoading: false,
  handleOnChangeBusinessType: jest.fn(),
  handleOnChangeLocationToggle: jest.fn(),
  handleChangePage: jest.fn(),
  handleClickOnClearAllFilters: jest.fn(),
  handleOnChangeFilterOptions: jest.fn(),
};

describe.skip('<Main />', () => {
  it('renders snapshot of Main', () => {
    const wrapper = shallow(<Main {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
