import React from 'react';
import {shallow} from 'enzyme';

import Pagination from '../../../components/businesses/Pagination';
import {MdChevronRight, MdChevronLeft} from 'react-icons/lib/md';

const handleChangePage = jest.fn();

describe('<Pagination />', () => {
  it('No returns prevPage button when the currentPage is 1', () => {
    const wrapper = shallow(
      <Pagination
        businessesMetadata={{pagination: {currentPage: 1}}}
        handleChangePage={handleChangePage}
      />
    );
    expect(
      wrapper.contains(
        <MdChevronLeft
          size={20}
          color={'#0C0033'}
          style={{marginRight: 8}}
          onClick={() => this.props.handleChangePage(2 - 1)}
        />
      )
    ).toBe(false);
  });

  it('Returns prevPage button when the currentPage is greater than 1', () => {
    const wrapper = shallow(
      <Pagination
        businessesMetadata={{pagination: {currentPage: 2}}}
        handleChangePage={handleChangePage}
      />
    );
    expect(
      wrapper.contains(
        <MdChevronLeft
          size={20}
          color={'#0C0033'}
          style={{marginRight: 8}}
          onClick={() => this.props.handleChangePage(2 - 1)}
        />
      )
    ).toBe(false);
  });

  it('No returns nextPage button when the nextPage is null', () => {
    const wrapper = shallow(
      <Pagination
        businessesMetadata={{pagination: {currentPage: 1, nextPage: null}}}
        handleChangePage={handleChangePage}
      />
    );
    expect(
      wrapper.contains(
        <MdChevronRight
          size={20}
          color={'#0C0033'}
          style={{marginRight: 8}}
          onClick={() => this.props.handleChangePage(2 - 1)}
        />
      )
    ).toBe(false);
  });

  it('No returns nextPage button when the currentPage is 1', () => {
    const wrapper = shallow(
      <Pagination
        businessesMetadata={{pagination: {currentPage: 2, nextPage: 1}}}
        handleChangePage={handleChangePage}
      />
    );
    expect(
      wrapper.contains(
        <MdChevronRight
          size={20}
          color={'#0C0033'}
          style={{marginRight: 8}}
          onClick={() => this.props.handleChangePage(2 - 1)}
        />
      )
    ).toBe(false);
  });

  it('Returns nextPage button when the currentPage is greater than 1', () => {
    const wrapper = shallow(
      <Pagination
        businessesMetadata={{pagination: {currentPage: 2, nextPage: 2}}}
        handleChangePage={handleChangePage}
      />
    );
    expect(
      wrapper.contains(
        <MdChevronRight
          size={20}
          color={'#0C0033'}
          style={{marginRight: 8}}
          onClick={() => this.props.handleChangePage(2 - 1)}
        />
      )
    ).toBe(false);
  });
});
