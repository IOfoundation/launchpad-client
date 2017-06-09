import React from 'react';
import {shallow} from 'enzyme';

import MetaInfoBusinesses
  from '../../../components/businesses/MetaInfoBusinesses';

describe('<MetaInfoBusinesses />', () => {
  it('Returns a span with the meta info of the Bussinesses that were found', () => {
    const wrapper = shallow(
      <MetaInfoBusinesses businessesMetadata={{pagination: {}}} />
    );
    expect(wrapper.find('span').length).toEqual(1);
  });

  describe('Returns a start - end count ranges for the currentPage of the businesses found', () => {
    it('Returns the totalBusinesses as the end when the end is less than (currentPage * perPage)', () => {
      const wrapper = shallow(
        <MetaInfoBusinesses
          businessesMetadata={{
            totalBusinesses: 3,
            pagination: {currentPage: 1, totalPage: 1, perPage: 10},
          }}
        />
      );
      expect(wrapper.contains('Showing Results 1-3')).toBe(true);
    });

    it('Returns (currentPage * perPage) as the end when totalBusinesses is greater than (currentPage * perPage)', () => {
      const wrapper = shallow(
        <MetaInfoBusinesses
          businessesMetadata={{
            totalBusinesses: 13,
            pagination: {currentPage: 1, totalPage: 1, perPage: 10},
          }}
        />
      );
      expect(wrapper.contains('Showing Results 1-10')).toBe(true);
    });

    it('Returns 1 as the start when currentPage is 1', () => {
      const wrapper = shallow(
        <MetaInfoBusinesses
          businessesMetadata={{
            totalBusinesses: 13,
            pagination: {currentPage: 1, totalPage: 1, perPage: 10},
          }}
        />
      );
      expect(wrapper.contains('Showing Results 1-10')).toBe(true);
    });

    it('Returns (((currentPage - 1) * perPage) + 1) as the start when currentPage is greater than 1', () => {
      const wrapper = shallow(
        <MetaInfoBusinesses
          businessesMetadata={{
            totalBusinesses: 13,
            pagination: {currentPage: 2, totalPage: 1, perPage: 10},
          }}
        />
      );
      expect(wrapper.contains('Showing Results 11-13')).toBe(true);
    });
  });
});