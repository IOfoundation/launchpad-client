import React from 'react';
import {shallow} from 'enzyme';

import Footer from '../../../components/shared/Footer';
import {Link} from 'react-router';

describe('<Footer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });

  it('Render a footer tag', () => {
    expect(wrapper.find('footer').length).toEqual(1);
  });

  describe('Nav Bar', () => {
    it('Should render the contentContainer', () => {
      expect(wrapper.find('.contentContainer').length).toEqual(1);
    });

    it('Render 5 links in the nav bar', () => {
      expect(wrapper.find(Link).length).toEqual(12);
    });

    it('Must have a link to admin login page', () => {
      const links = wrapper.find('[data-test="footer-login"]');
      expect(links.contains(<Link to="">{'Admin Login'}</Link>)).toBe(true);
    });

    it('Must have a link to search, events and Blog page', () => {
      const links = wrapper.find('[data-test="footer-resources"]');
      expect(links.contains(<Link to="">{'Search'}</Link>)).toBe(true);
      expect(links.contains(<Link to="">{'Events'}</Link>)).toBe(true);
      expect(links.contains(<Link to="">{'Blog'}</Link>)).toBe(true);
    });

    it('Must have links to about, contact, terms & condicitons and privacy policy', () => {
      const links = wrapper.find('[data-test="footer-about"]');
      expect(links.contains(<Link to="">{'About'}</Link>)).toBe(true);
      expect(links.contains(<Link to="/contact-us">{'Contact'}</Link>)).toBe(
        true
      );
      expect(
        links.contains(<Link to="/terms-of-use">{'Terms & Conditions'}</Link>)
      ).toBe(true);
      expect(
        links.contains(<Link to="/privacy-policy">{'Privacy Policy'}</Link>)
      ).toBe(true);
    });
  });
});
