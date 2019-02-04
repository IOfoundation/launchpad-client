import React from 'react';
import {shallow} from 'enzyme';
import {Link} from 'react-router';

import Header from '../../../components/shared/Header';

const props = {
  homePage: false,
};

describe('<Header />', () => {
  it('Render a header tag', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper.find('header').length).toEqual(1);
  });

  describe('Nav Bar', () => {
    it('Render a nav bar', () => {
      const wrapper = shallow(<Header {...props} />);
      expect(wrapper.find('nav').length).toEqual(1);
    });

    it('Render 5 links in the nav bar', () => {
      const wrapper = shallow(<Header {...props} />);
      expect(wrapper.find(Link).length).toEqual(5);
    });

    it('Must have a link to businesses page', () => {
      const wrapper = shallow(<Header {...props} />);
      expect(
        wrapper.contains(
          <Link className="header_link" to="/businesses">
            {'Resources'}
          </Link>
        )
      ).toBe(true);
    });

    it('Must have a link to events page', () => {
      const wrapper = shallow(<Header {...props} />);
      expect(
        wrapper.contains(
          <Link className="header_link" to="/events">
            {'Events'}
          </Link>
        )
      ).toBe(true);
    });

    it('Must have a link to blog page', () => {
      const wrapper = shallow(<Header {...props} />);
      expect(
        wrapper.contains(
          <Link className="header_link" to="/blog">
            {'Blog'}
          </Link>
        )
      ).toBe(true);
    });

    it('Must have a link to admin-login page', () => {
      const wrapper = shallow(<Header {...props} />);
      expect(
        wrapper.contains(
          <Link className="header_link" to="/admin-login">
            {'Admin Login'}
          </Link>
        )
      ).toBe(true);
    });
  });
});
