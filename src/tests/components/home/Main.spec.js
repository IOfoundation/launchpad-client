import React from 'react';
import {shallow} from 'enzyme';

import HomePage from '../../../components/home/Main';
import {Link} from 'react-router';

const services = [];
const handleClickOnServiceTag = jest.fn();

describe('<HomePage />', () => {
  it('Renders a Link to Businesses page with the "View All Resources"', () => {
    const wrapper = shallow(<HomePage services={services} handleClickOnServiceTag={handleClickOnServiceTag}/>);
    expect(
      wrapper.contains(<Link to="/businesses">{'View All Resources'}</Link>)
    ).toBe(true);
  });

  it('Renders a form"', () => {
    const wrapper = shallow(<HomePage services={services} handleClickOnServiceTag={handleClickOnServiceTag}/>);
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('Renders a ServicesBox"', () => {
    const wrapper = shallow(<HomePage services={services} handleClickOnServiceTag={handleClickOnServiceTag}/>);
    expect(wrapper.find('ServicesBox').length).toEqual(1);
  });
});
