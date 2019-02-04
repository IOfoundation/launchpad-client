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
    expect(wrapper.find('.remark').text()).toEqual('Resource Finder');
    expect(wrapper.find('.main-title').text()).toEqual(
      "Where startups and small business connect inCalifornia's Capital Region"
    );
    expect(wrapper.find('.mobile-devices').text()).toEqual(
      "Where startups and small business connect in California's Capital Region"
    );
  });
});
