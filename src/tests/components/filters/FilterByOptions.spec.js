import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import FilterByOptions from '../../../components/filters/FilterByOptions.js';
import filtersFixture from '../../fixtures/filters';

const createProps = props => {
  return {
    filterName: props.filterName,
    filterOptions: props.filterOptions,
    handleOnChangeFilterOptions: jest.fn(),
  };
};

xdescribe('<FilterByOptions />', () => {
  it('renders snapshot of FilterByOptions', () => {
    const props = createProps({
      filterName: 'Business Services',
      filterOptions: filtersFixture.businessServices,
    });
    const wrapper = shallow(<FilterByOptions {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
