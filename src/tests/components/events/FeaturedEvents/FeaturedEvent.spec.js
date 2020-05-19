import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import FeaturedEvent from '../../../../components/events/FeaturedEvents/FeaturedEvent';

const props = {
  date: 'date',
  description: 'description',
  name: 'name',
  title: 'title:',
};

describe('<FeaturedEvent />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FeaturedEvent {...props} />);
  });

  it('renders snapshot of FeaturedEvent', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
