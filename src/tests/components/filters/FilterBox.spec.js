import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import FilterBox from '../../../components/filters/FilterBox.js';
import organizationFixture from '../../fixtures/organization';
import filtersFixture from '../../fixtures/filters';

const createProps = props => {
  return {
    businesses: {
      appliedFilters: props.appliedFilters,
      filters: filtersFixture,
      items: props.items,
      organizations: [organizationFixture],
    },
    filterById: false,
    getTextSearchResults: jest.fn(),
    handleClickOnClearAllFilters: jest.fn(),
    handleOnChangeFilterOptions: jest.fn(),
  };
};

describe('<FilterBox />', () => {
  it('renders snapshot of FilterBox', () => {
    const props = createProps({
      appliedFilters: {page: 1},
      items: [],
    });
    const wrapper = shallow(<FilterBox {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
