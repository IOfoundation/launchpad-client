import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import Main from 'components/map-view/Main';

const createProps = () => {
  return {
    expanded: false,
    highlightOrgCard: jest.fn(),
    isMobile: false,
    locations: [],
    onBoundsChange: jest.fn(),
    organizations: [],
    showLoading: false,
    toggleSwitch: false,
  };
};

describe('<Main />', () => {
  it('renders snapshot of map-view/Main', () => {
    const props = createProps();
    const wrapper = shallow(<Main {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
