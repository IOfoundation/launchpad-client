import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import Blog from '../../../components/blog/Blog';
import Jumbotron from '../../../components/shared/Jumbotron';

const props = {
  breakpoint: 'sm',
};

describe('<Blog />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Blog {...props} />);
  });

  it('renders snapshot of Blog', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should create Jumbotron with props', () => {
    const jumbotron = wrapper.find(Jumbotron);

    expect(jumbotron.props()).toEqual({
      title: 'Resource Finder Blog',
      description: 'Find content relevant to your industry and business stage.',
      descriptionModifacor: 'full-white',
      background: 'blog-header',
    });
  });
});
