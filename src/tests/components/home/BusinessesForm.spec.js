import React from 'react';
import {shallow} from 'enzyme';

import BusinessesForm from '../../../components/home/BusinessesForm';

const populatedItems = [
  {
    0: {
      content: 'Category 1',
      searchable_type: 'Category'
    },

    1: {
      content: 'Business 1',
      searchable_type: 'Organization'
    },

    2: {
      content: 'Business 2',
      searchable_type: 'Organization'
    },
  }
];
const emptyItems =[];
const getTextSearchResults = jest.fn();

describe('<BusinessesForm />', () => {
  it('Search box renders results', () => {
    const wrapper = shallow(
      <BusinessesForm
        items={populatedItems}
        getTextSearchResults={getTextSearchResults}
      />
    );
    expect(wrapper.exists('.hero-dropdown-list'));
  });

  it('No text in the search box should not render results', () => {
    const wrapper = shallow(
      <BusinessesForm
        items={emptyItems}
        getTextSearchResults={getTextSearchResults}
      />
    );
    expect(wrapper.exists('hero-dropdown-list') === false);
  });
});
