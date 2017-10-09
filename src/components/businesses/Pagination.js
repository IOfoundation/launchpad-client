import React from 'react';
import {PropTypes} from 'prop-types';
import {MdChevronRight, MdChevronLeft} from 'react-icons/lib/md';

class Pagination extends React.Component {
  render() {
    const {currentPage} = this.props.businessesMetadata.pagination;
    const {last} = this.props.businessesMetadata.pagination;

    const nextPage = currentPage < last.page ? currentPage + 1 : last.page;
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;

    const pages = Array(last.page).fill(1).map((v, i) => v + i);
    
    let prevPageArrow = null;
    prevPageArrow = (
      <MdChevronLeft
        className="pagination-arrow pagination-arrow-left"
        size={15}
        color={'#fff'}
        style={{marginRight: 15}}
        onClick={() => this.props.handleChangePage(prevPage)}
      />
    );

    let nextPageArrow = null;
    nextPageArrow = (
      <MdChevronRight
        className="pagination-arrow pagination-arrow-left"
        size={15}
        color={'#fff'}
        style={{marginLeft: 15}}
        onClick={() => this.props.handleChangePage(nextPage)}
      />
    );
    return (
      <div className="text-center pagination between-xs middle-xs m-bot-100">
        <div>
          {prevPageArrow}
          {pages.map((page) =>
            <span
              className="pagination-index"
              key={page}
              onClick={() => this.props.handleChangePage(page)}
            >
              {page}
            </span>
          )}
          {nextPageArrow}
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  businessesMetadata: PropTypes.object.isRequired,
  handleChangePage: PropTypes.func.isRequired,
};

export default Pagination;
