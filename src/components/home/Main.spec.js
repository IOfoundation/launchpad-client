import React from 'react';
import { shallow } from 'enzyme';

import HomePage from './Main';
import { Link } from 'react-router';

describe('<HomePage />', () => {

  it('Renders a Link to Businesses page with the "View All Resources"', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.contains(<Link to="/businesses">{'View All Resources'}</Link>)).toBe(true);
  });

  it('Renders a form"', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('Renders a ServicesBox"', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find('ServicesBox').length).toEqual(1);
  });

});
