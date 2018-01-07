import React from 'react';
import {PropTypes} from 'prop-types';
import ReactPaginate from 'react-paginate';
import ArrowLeft from '../shared/ArrowLeft';
import ArrowRight from '../shared/ArrowRight';

class Pagination extends React.Component {
  handlePageClick(data) {
    const selected = data.selected + 1;
    this.props.handleChangePage(selected);
  }

  render() {
    const {last} = this.props.metadata.pagination;
    const {page} = this.props.appliedFilters;
    if (!last.page) {
      return null;
    }
    const pages = Array(last.page)
      .fill(1)
      .map((v, i) => v + i);
    return (
      <div
        className={
          pages.length <= 1
            ? 'pagination-container-hide'
            : 'pagination between-xs middle-xs m-bot-100'
        }
      >
        <ReactPaginate
          previousLabel={
            <ArrowLeft
              className="pagination-arrow"
              size={17}
              style={{color: '#fff', verticalAlign: 'middle'}}
            />
          }
          nextLabel={
            <ArrowRight
              className="pagination-arrow"
              size={17}
              style={{color: '#fff', verticalAlign: 'middle'}}
            />
          }
          pageCount={last.page}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={this.handlePageClick.bind(this)}
          containerClassName={'pagination-index text-bold'}
          subContainerClassName={'pagination-numbers '}
          activeClassName={'active'}
          forcePage={page - 1}
        />
      </div>
    );
  }
}
Pagination.propTypes = {
  appliedFilters: PropTypes.shape({
    category: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    page: PropTypes.number,
  }).isRequired,
  handleChangePage: PropTypes.func.isRequired,
  metadata: PropTypes.shape({
    pagination: PropTypes.shape({
      first: PropTypes.object,
      last: PropTypes.object,
      next: PropTypes.object,
      currentPage: PropTypes.number,
    }),
    totalOrganization: PropTypes.string,
  }).isRequired,
};

export default Pagination;
