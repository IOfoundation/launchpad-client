import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import Content from '../../../../components/events/Modal/Content';

const closed = jest.fn();
const props = {
  address: 'Address',
  closed,
  description: 'Descripton',
  end: 'end',
  link: 'url',
  postedBy: {
    name: 'name',
    website: 'website',
  },
  start: 'Starts',
  title: 'Title',
};

describe('<Content />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Content {...props} />);
  });

  it('renders snapshot of Modal Content', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should trigger the close option', () => {
    const button = wrapper.find('.modal-events__close');

    button.simulate('click');

    expect(closed).toBeCalled();
  });
});
