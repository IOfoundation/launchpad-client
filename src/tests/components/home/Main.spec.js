import React from 'react';
import {shallow} from 'enzyme';

import HomePage from '../../../components/home/Main';
import BusinessesForm from '../../../components/home/BusinessesForm';

const services = [];
const handleClickOnServiceTag = jest.fn();
const handleSubmitSearchBusinessesForm = jest.fn();

describe('<HomePage />', () => {
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
});
