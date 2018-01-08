import React from 'react';
import {shallow} from 'enzyme';

import HomePage from '../../../components/home/Main';
import BusinessesForm from '../../../components/home/BusinessesForm';

const items = [];
const getTextSearchResults = jest.fn();

describe('<HomePage />', () => {
  it('Renders a BusinessesForm"', () => {
    const wrapper = shallow(
      <HomePage items={items} getTextSearchResults={getTextSearchResults} />
    );
    expect(wrapper.find(BusinessesForm).length).toEqual(1);
  });
});
