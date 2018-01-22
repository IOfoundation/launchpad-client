import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import Main from '../../../components/layouts/Main';

const createProps = props => {
  return {
    homePage: props.homePage,
    windowWidth: props.windowWidth,
  };
};

describe('<Main />', () => {
  it('renders snapshot of Main', () => {
    const props = createProps({homePage: false, windowWidth: 960});
    const wrapper = shallow(<Main {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
