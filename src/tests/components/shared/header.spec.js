import React from 'react';
import {mount} from 'enzyme';
import {Link} from 'react-router';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import toJson from 'enzyme-to-json';

import Header from '../../../components/shared/Header';

const initialState = {
  user: {
    Authorization: 'auth',
  },
};
const props = {
  homePage: false,
};
const activeStyles = {opacity: '1'};
const mockStore = configureStore([thunk]);
let store;
let wrapper;

describe('<Header />', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Header {...props} />
      </Provider>
    );
  });

  it('Render a header tag', () => {
    expect(wrapper.find('header').length).toEqual(1);
  });

  describe('Nav Bar', () => {
    it('Render a nav bar', () => {
      expect(wrapper.find('nav').length).toEqual(1);
    });

    it('Render 5 links in the nav bar', () => {
      expect(wrapper.find(Link).length).toEqual(5);
    });

    it('Must have a link to businesses page', () => {
      expect(
        wrapper.contains(
          <Link
            activeStyle={activeStyles}
            className="header_link white-link "
            to="/businesses"
          >
            {'Resources'}
          </Link>
        )
      ).toBe(true);
    });

    it('Must have a link to events page', () => {
      expect(
        wrapper.contains(
          <Link
            activeStyle={activeStyles}
            className="header_link white-link"
            to="/events"
          >
            {'Events'}
          </Link>
        )
      ).toBe(true);
    });

    it('Must have a link to blog page', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Must have a link to admin-login page', () => {
      expect(
        wrapper.contains(
          <Link
            activeStyle={activeStyles}
            className="header_link white-link"
            to="/admin-login"
          >
            {'Admin Login'}
          </Link>
        )
      ).toBe(true);
    });
  });
});
