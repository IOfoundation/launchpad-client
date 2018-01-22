import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import FilterByText from 'components/filters/FilterByText';
import organizationFixture from 'tests/fixtures/organization';

const createProps = props => {
  return {
    filterName: 'Search Box',
    getTextSearchResults: jest.fn(),
    handleClickOnClearAllFilters: jest.fn(),
    handleOnChangeFilterOptions: jest.fn(),
    filterById: false,
    appliedFilters: props.appliedFilters,
    organizations: [organizationFixture],
    items: props.items,
  };
};

describe('<FilterByText />', () => {
  it('renders snapshot of FilterByOptions', () => {
    const props = createProps({
      appliedFilters: {page: 1},
      items: [],
    });
    const wrapper = shallow(<FilterByText {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
