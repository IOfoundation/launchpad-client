import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import FilterOption from 'components/filters/mobile/FilterOption';
import filtersFixture from 'tests/fixtures/filters';

const createProps = props => {
  return {
    filterName: props.filterName,
    filterOptions: props.filterOptions,
    handleOnChangeFilterOptions: jest.fn(),
  };
};

xdescribe('<FilterByText />', () => {
  it('renders snapshot for mobile FilterOption component', () => {
    const props = createProps({
      filterName: 'Business Services',
      filterOptions: filtersFixture.businessServices,
    });
    const wrapper = shallow(<FilterOption {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
