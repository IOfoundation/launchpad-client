import React from 'react';
import {PropTypes} from 'prop-types';
import ReactPaginate from 'react-paginate';
import ArrowLeft from '../shared/ArrowLeft';
import ArrowRight from '../shared/ArrowRight';

const Pagination = props => {
  const _handlePageClick = data => {
    const selected = data.selected + 1;
    props.handleChangePage(selected);
  };
  const {last} = props.metadata.pagination;
  const {page} = props.appliedFilters;
  const {noMargin} = props;
  let classes = '';

  if (noMargin) {
    classes = 'pagination between-xs middle-xs';
  } else {
    classes = 'pagination between-xs middle-xs m-bot-100';
  }

  if (!last.page) {
    return null;
  }

  return (
    <div className={classes}>
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
        onPageChange={_handlePageClick.bind(this)}
        containerClassName={'pagination-index text-bold'}
        subContainerClassName={'pagination-numbers '}
        activeClassName={'active'}
        forcePage={page - 1}
      />
    </div>
  );
};
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
  noMargin: PropTypes.bool,
};

export default Pagination;
