import React from 'react';
import {shallow} from 'enzyme';

import Pagination from '../../../components/businesses/Pagination';

const handleChangePage = jest.fn();

describe('<MetaInfoBusinesses />', () => {
  it('No returns prevPage button when the currentPage is 1', () => {
    const wrapper = shallow(
      <Pagination
        businessesMetadata={{pagination: {currentPage: 1}}}
        handleChangePage={handleChangePage}
      />
    );
    expect(wrapper.contains('<')).toBe(false);
  });

  it('Returns prevPage button when the currentPage is greater than 1', () => {
    const wrapper = shallow(
      <Pagination
        businessesMetadata={{pagination: {currentPage: 2}}}
        handleChangePage={handleChangePage}
      />
    );
    expect(wrapper.contains('<')).toBe(true);
  });

  it('No returns nextPage button when the nextPage is null', () => {
    const wrapper = shallow(
      <Pagination
        businessesMetadata={{pagination: {currentPage: 1, nextPage: null}}}
        handleChangePage={handleChangePage}
      />
    );
    expect(wrapper.contains('>')).toBe(false);
  });

  it('No returns nextPage button when the currentPage is 1', () => {
    const wrapper = shallow(
      <Pagination
        businessesMetadata={{pagination: {currentPage: 2, nextPage: 1}}}
        handleChangePage={handleChangePage}
      />
    );
    expect(wrapper.contains('>')).toBe(false);
  });

  it('Returns nextPage button when the currentPage is greater than 1', () => {
    const wrapper = shallow(
      <Pagination
        businessesMetadata={{pagination: {currentPage: 2, nextPage: 2}}}
        handleChangePage={handleChangePage}
      />
    );
    expect(wrapper.contains('>')).toBe(true);
  });
});
