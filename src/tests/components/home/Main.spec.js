import React from 'react';
import {shallow} from 'enzyme';

import HomePage from '../../../components/home/Main';
import BusinessesForm from '../../../components/home/BusinessesForm';

const items = [];
const getTextSearchResults = jest.fn();

describe('<HomePage />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <HomePage items={items} getTextSearchResults={getTextSearchResults} />
    );
  });

  it('Renders a BusinessesForm"', () => {
    expect(wrapper.find(BusinessesForm).length).toEqual(1);
  });

  it('Should macth the remarks, title and subtitle', () => {
    expect(wrapper.find('.remark').text()).toEqual('iFinder');
    expect(wrapper.find('.main-title').text()).toEqual(
      'Regional Resources To Help Your Business Launch, Scale, and Grow'
    );
    expect(wrapper.find('.mobile-devices').text()).toEqual(
      'Regional Resources To Help Your Business Launch, Scale, and Grow'
    );
  });
});
