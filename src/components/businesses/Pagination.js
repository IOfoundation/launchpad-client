import React from 'react';
import {PropTypes} from 'prop-types';
import ReactPaginate from 'react-paginate';
import ArrowLeft from '../shared/ArrowLeft';
import ArrowRight from '../shared/ArrowRight';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }
  handlePageClick(data) {
    let selected = data.selected + 1;
    this.props.handleChangePage(selected);
  }

  render() {
    const {last} = this.props.businessesMetadata.pagination;
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
            : 'text-center pagination between-xs middle-xs m-bot-100'
        }
      >
        <ReactPaginate
          previousLabel={
            <ArrowLeft
              className="pagination-arrow"
              size={17}
              style={{marginLeft: 4, color: '#fff', verticalAlign: 'middle'}}
            />
          }
          nextLabel={
            <ArrowRight
              className="pagination-arrow"
              size={17}
              style={{marginLeft: 4, color: '#fff', verticalAlign: 'middle'}}
            />
          }
          pageCount={last.page}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={this.handlePageClick.bind(this)}
          containerClassName={'pagination-index text-semi'}
          subContainerClassName={'pagination-numbers '}
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
