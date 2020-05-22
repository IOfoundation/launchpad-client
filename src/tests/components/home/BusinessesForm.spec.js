import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

import BusinessesForm from '../../../components/home/BusinessesForm';

const props = {
  getTextSearchResults: jest.fn(),
  items: [{id: 1, content: 'content', searchable_type: 'Category'}],
};

describe('<BusinessesForm />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BusinessesForm {...props} />);
  });

  it('Search box renders results', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should call set the correct placeholder', () => {
    expect(wrapper.find('input').prop('placeholder')).toEqual(
      'Search all businesses and services'
    );
  });

  xit('Should displasy the dropdown', () => {
    expect(wrapper.find('.hero_input-dropdown').prop('className')).toEqual(
      'hero_input-dropdown hero_input-hide'
    );

    wrapper.find('.text-search-icon').prop('onClick')();

    expect(wrapper.find('.hero_input-dropdown').prop('className')).toEqual(
      'hero_input-dropdown hero_input-show'
    );
  });

  it('Should get the text search results', () => {
    wrapper.find('input').simulate('change', {target: {value: 'content'}});

    expect(props.getTextSearchResults).toHaveBeenCalled();
  });
});
