import React from 'react';
import {mount} from 'enzyme';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {categories} from './categories.mock';

import Categories from '../../../components/blog/Categories';

const initialState = {
  blogs: {
    categories: [...categories],
    category: 'front page',
    featuredPosts: [],
    noResults: false,
    organizationPosts: [],
    page: 1,
    posts: [],
    totalPages: 0,
  },
};
const mockStore = configureStore([thunk]);
const props = {};
let store;
let wrapper;

describe('<Categories />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Categories {...props} />
      </Provider>
    );
  });

  it('renders snapshot of Categories', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('display more categories', () => {
    const button = wrapper.find('button.button-outline');

    expect(button.text()).toBe('More Categories');
    button.simulate('click');

    expect(button.text()).toBe('View Less');
  });

  it('filter by categorie with default views', () => {
    const category = wrapper.find('.blog-categories__list__item');

    expect(store.getActions().length).toBe(1);
    category.at(2).simulate('click');

    expect(store.getActions().length).toBe(2);
  });

  it('filter by categorie with view more on true', () => {
    const category = wrapper.find('.blog-categories__list__item');
    const button = wrapper.find('button.button-outline');

    expect(store.getActions().length).toBe(1);
    button.simulate('click');
    category.at(2).simulate('click');

    expect(store.getActions().length).toBe(2);
  });
});
