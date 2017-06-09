import React from 'react';
import {shallow} from 'enzyme';

import BusinessesForm from '../../../components/home/BusinessesForm';

const handleSubmitSearchBusinessesForm = jest.fn();

describe('<BusinessesForm />', () => {
  it('Returns a form tag', () => {
    const wrapper = shallow(
      <BusinessesForm
        handleSubmitSearchBusinessesForm={handleSubmitSearchBusinessesForm}
      />
    );
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('Render an input for text search with the class businessesName', () => {
    const wrapper = shallow(
      <BusinessesForm
        handleSubmitSearchBusinessesForm={handleSubmitSearchBusinessesForm}
      />
    );
    expect(wrapper.find('.businessesName').length).toEqual(1);
  });

  it('Render an submit input', () => {
    const wrapper = shallow(
      <BusinessesForm
        handleSubmitSearchBusinessesForm={handleSubmitSearchBusinessesForm}
      />
    );
    expect(wrapper.find('.submit').length).toEqual(1);
  });
});
