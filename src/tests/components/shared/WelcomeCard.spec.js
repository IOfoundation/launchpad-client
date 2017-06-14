import React from 'react';
import {shallow} from 'enzyme';

import WelcomeCard from '../../../components/shared/WelcomeCard';

describe('<WelcomeCard />', () => {
  it('Render a close button tag', () => {
    const wrapper = shallow(<WelcomeCard />);
    expect(wrapper.find('button').length).toEqual(1);
  });
  it('Render a h1 tag', () => {
    const wrapper = shallow(<WelcomeCard />);
    expect(wrapper.find('h1').length).toEqual(1);
  });
  it('Render two p tags', () => {
    const wrapper = shallow(<WelcomeCard />);
    expect(wrapper.find('p').length).toEqual(2);
  });
});
