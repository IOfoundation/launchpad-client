import React from 'react';
import {shallow} from 'enzyme';
import Pagination from '../../../components/businesses/Pagination';
import ArrowLeft from '../../../components/shared/ArrowLeft';
import ArrowRight from '../../../components/shared/ArrowRight';

const handleChangePage = jest.fn();

describe('<Pagination />', () => {
  it('No returns prevPage button when the currentPage is 1', () => {
    const wrapper = shallow(
      <Pagination
        businessesMetadata={{
          pagination: {
            first: {page: 1, per_page: 4},
            last: {},
            next: {},
            currentPage: 1,
          },
        }}
        handleChangePage={handleChangePage}
      />
    );
    expect(
      wrapper.contains(
        <ArrowLeft
          size={20}
          style={{marginRight: 8, color: '#0C0033'}}
          onClick={() => this.props.handleChangePage(2 - 1)}
        />
      )
    ).toBe(false);
  });

  it('Returns prevPage button when the currentPage is greater than 1', () => {
    const wrapper = shallow(
      <Pagination
        businessesMetadata={{
          pagination: {
            first: {page: 1, per_page: 3},
            last: {page: 2, per_page: 3},
            prev: {page: 1, per_page: 3},
            currentPage: 2,
          },
        }}
        handleChangePage={handleChangePage}
      />
    );
    expect(
      wrapper.contains(
        <ArrowLeft
          size={20}
          color={'#0C0033'}
          style={{marginRight: 8}}
          onClick={() => this.props.handleChangePage(2 - 1)}
        />
      )
    ).toBe(false);
  });

  it('No returns nextPage button when current page is the last page', () => {
    const wrapper = shallow(
      <Pagination
        businessesMetadata={{
          pagination: {
            first: {page: 1, per_page: 3},
            last: {page: 2, per_page: 3},
            prev: {page: 1, per_page: 3},
            currentPage: 2,
          },
        }}
        handleChangePage={handleChangePage}
      />
    );
    expect(
      wrapper.contains(
        <ArrowRight
          size={20}
          style={{marginRight: 8, color: '#0C0033'}}
          onClick={() => this.props.handleChangePage(2 - 1)}
        />
      )
    ).toBe(false);
  });
});
