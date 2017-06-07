import React from 'react';
import {shallow} from 'enzyme';

import HomePage from '../../../components/home/Main';
import BusinessesForm from '../../../components/home/BusinessesForm';
import {Link} from 'react-router';

const services = [];
const handleClickOnServiceTag = jest.fn();
const handleSubmitSearchBusinessesForm = jest.fn();

describe('<HomePage />', () => {
  it('Renders a Link to Businesses page with the "View All Resources"', () => {
    const wrapper = shallow(
      <HomePage
        services={services}
        handleClickOnServiceTag={handleClickOnServiceTag}
        handleSubmitSearchBusinessesForm={handleSubmitSearchBusinessesForm}
      />
    );
    expect(
      wrapper.contains(<Link to="/businesses">{'View All Resources'}</Link>)
    ).toBe(true);
  });

  it('Renders a BusinessesForm"', () => {
    const wrapper = shallow(
      <HomePage
        services={services}
        handleClickOnServiceTag={handleClickOnServiceTag}
        handleSubmitSearchBusinessesForm={handleSubmitSearchBusinessesForm}
      />
    );
    expect(wrapper.find(BusinessesForm).length).toEqual(1);
  });

  it('Renders a ServicesBox"', () => {
    const wrapper = shallow(
      <HomePage
        services={services}
        handleClickOnServiceTag={handleClickOnServiceTag}
        handleSubmitSearchBusinessesForm={handleSubmitSearchBusinessesForm}
      />
    );
    expect(wrapper.find('ServicesBox').length).toEqual(1);
  });
});
