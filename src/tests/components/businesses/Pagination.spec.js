import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Pagination from '../../../components/businesses/Pagination';
import ArrowLeft from '../../../components/shared/ArrowLeft';
import ArrowRight from '../../../components/shared/ArrowRight';

const createProps = props => {
  return {
    appliedFilters: {
      page: props.page,
    },
    handleChangePage: jest.fn(),
    metadata: {
      pagination: props.pagination,
    },
  };
};

describe('<Pagination />', () => {
  it('No prevPage button when the currentPage is 1', () => {
    const props = createProps({
      page: 1,
      pagination: {
        first: {page: 1, per_page: 4},
        last: {},
        next: {},
        currentPage: 1,
      },
    });
    const wrapper = shallow(<Pagination {...props} />);
    expect(
      wrapper.contains(
        <ArrowLeft
          size={20}
          style={{marginRight: 8, color: '#0C0033'}}
          onClick={() => this.props.handleChangePage(2 - 1)}
        />
      )
    ).to.equal(false);
  });

  it('Should return prevPage button when the currentPage is greater than 1', () => {
    const props = createProps({
      page: 2,
      pagination: {
        first: {page: 1, per_page: 3},
        last: {page: 2, per_page: 3},
        prev: {page: 1, per_page: 3},
        currentPage: 2,
      },
    });
    const wrapper = shallow(<Pagination {...props} />);
    expect(
      wrapper.contains(
        <ArrowLeft
          size={20}
          color={'#0C0033'}
          style={{marginRight: 8}}
          onClick={() => this.props.handleChangePage(2 - 1)}
        />
      )
    ).to.equal(false);
  });

  it('No nextPage button when current page is the last page', () => {
    const props = createProps({
      page: 2,
      pagination: {
        first: {page: 1, per_page: 3},
        last: {page: 2, per_page: 3},
        prev: {page: 1, per_page: 3},
        currentPage: 2,
      },
    });
    const wrapper = shallow(<Pagination {...props} />);
    expect(
      wrapper.contains(
        <ArrowRight
          size={20}
          style={{marginRight: 8, color: '#0C0033'}}
          onClick={() => this.props.handleChangePage(2 - 1)}
        />
      )
    ).to.equal(false);
  });

  it('No pagination when only one page of results', () => {
    const props = createProps({
      page: 2,
      pagination: {
        first: {page: 1, per_page: 3},
        last: {page: 1, per_page: 3},
        currentPage: 1,
      },
    });
    const wrapper = shallow(<Pagination {...props} />);
    expect(wrapper.exists('.pagination-container-hide')).to.equal(true);
  });
});
