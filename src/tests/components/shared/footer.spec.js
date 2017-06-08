import React from 'react';
import {shallow} from 'enzyme';

import Footer from '../../../components/shared/Footer';

describe('<Footer />', () => {
  it('Render a footer tag', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('footer').length).toEqual(1);
  });
});
