import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import ResultInfo from '../../../components/businesses/ResultInfo';
import filtersFixture from '../../fixtures/filters';

const createProps = props => {
  return {
    filterOptions: filtersFixture.businessTypes,
    handleOnChangeFilterOptions: jest.fn(),
    metadata: props.metadata,
    showBusinessTypes: props.showBusinessTypes,
    showLoading: false,
  };
};

describe('<ResultInfo />', () => {
  it('renders snapshot of ResultInfo', () => {
    const props = createProps({
      metadata: {
        totalOrganization: '50',
      },
      showBusinessTypes: true,
    });
    const wrapper = shallow(<ResultInfo {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
