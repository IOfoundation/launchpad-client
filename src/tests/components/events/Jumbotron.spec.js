import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import Jumbotron from '../../../components/events/Jumbotron';

describe('<Jumbotron />', () => {
  it('renders snapshot of Events Jumbotron', () => {
    const wrapper = shallow(<Jumbotron />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
