import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import FilterByText from 'components/filters/mobile/FilterByText';
import organizationFixture from 'tests/fixtures/organization';

const props = {
  appliedFilters: {
    page: 1,
  },
  filterById: false,
  getTextSearchResults: jest.fn(),
  handleClickOnClearAllFilters: jest.fn(),
  handleOnChangeFilterOptions: jest.fn(),
  items: [],
  organizations: [organizationFixture],
};

describe('<FilterByText />', () => {
  it('renders snapshot for mobile FilterByText component', () => {
    const wrapper = shallow(<FilterByText {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
