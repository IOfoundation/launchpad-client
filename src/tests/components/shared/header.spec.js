import React from 'react';
import {shallow} from 'enzyme';
import {Link} from 'react-router';

import Header from '../../../components/shared/Header';

describe('<Header />', () => {
  it('Render a header tag', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('header').length).toEqual(1);
  });

  describe('Nav Bar', () => {
    it('Render a nav bar', () => {
      const wrapper = shallow(<Header />);
      expect(wrapper.find('nav').length).toEqual(1);
    });

    it('Render 5 links in the nav bar', () => {
      const wrapper = shallow(<Header />);
      expect(wrapper.find(Link).length).toEqual(5);
    });

    it('Must have a link to contact-us page', () => {
      const wrapper = shallow(<Header />);
      expect(
        wrapper.contains(
          <Link className="header_link" to="/contact-us">
            {'Contact Us'}
          </Link>
        )
      ).toBe(true);
    });

    it('Must have a link to terms-of-use page', () => {
      const wrapper = shallow(<Header />);
      expect(
        wrapper.contains(
          <Link className="header_link" to="/terms-of-use">
            {'Terms of Use'}
          </Link>
        )
      ).toBe(true);
    });

    it('Must have a link to back-to-Home page', () => {
      const wrapper = shallow(<Header />);
      expect(
        wrapper.contains(
          <Link className="header_leftLink" to="/">
            {'Back To Home'}
          </Link>
        )
      ).toBe(false);
    });
  });
});
