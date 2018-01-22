import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import FilterByOptions from 'components/filters/mobile/FilterByOptions';
import filtersFixture from 'tests/fixtures/filters';

const props = {
  filterOptions: filtersFixture,
  handleOnChangeFilterOptions: jest.fn(),
};

describe('<FilterByText />', () => {
  it('renders snapshot for mobile FilterByOptions component', () => {
    const wrapper = shallow(<FilterByOptions {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
