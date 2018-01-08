import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import BusinessesForm from '../../../components/home/BusinessesForm';

const props = {
  getTextSearchResults: jest.fn(),
  items: [],
};

describe('<BusinessesForm />', () => {
  it('Search box renders results', () => {
    const wrapper = shallow(<BusinessesForm {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
