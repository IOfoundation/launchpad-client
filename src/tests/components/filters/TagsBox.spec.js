import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import TagsBox from 'components/filters/TagsBox';

const createProps = props => {
  return {
    clearAll: jest.fn(),
    deleteFilter: jest.fn(),
    filters: props.filters,
  };
};

describe('<TagsBox />', () => {
  it('renders snapshot of TagsBox', () => {
    const props = createProps({
      filters: {category: []},
    });
    const wrapper = shallow(<TagsBox {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
