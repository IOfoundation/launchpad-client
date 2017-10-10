import React from 'react';
import {PropTypes} from 'prop-types';
import {MdChevronRight, MdChevronLeft} from 'react-icons/lib/md';
import ReactPaginate from 'react-paginate';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }
  handlePageClick(data) {
    let selected = data.selected + 1;
    this.props.handleChangePage(selected)
  }

  render() {
    const {last} = this.props.businessesMetadata.pagination;
    const pages = Array(last.page)
     .fill(1)
     .map((v, i) => v + i);
    return (
      <div className={
          pages.length <= 1 ?
            'pagination-container-hide' : 'text-center pagination between-xs middle-xs m-bot-100'}
      >
        <ReactPaginate
          previousLabel={
            <MdChevronLeft
              className="pagination-arrow"
              size={17}
              color={'#fff'}
              style={{marginLeft: 4}}
            />}
          nextLabel={
            <MdChevronRight
              className="pagination-arrow"
              size={17}
              color={'#fff'}
              style={{marginLeft: 4}}
            />}
          pageCount={last.page}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick.bind(this)}
          containerClassName={'pagination-index'}
          subContainerClassName={'pagination-numbers'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}
Pagination.propTypes = {
  businessesMetadata: PropTypes.object.isRequired,
  handleChangePage: PropTypes.func.isRequired,
};

export default Pagination;
