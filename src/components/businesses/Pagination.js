import React from 'react';
import {PropTypes} from 'prop-types';
import {MdChevronRight, MdChevronLeft} from 'react-icons/lib/md';

class Pagination extends React.Component {
  render() {
    const {current_page} = this.props.businessesMetadata.pagination;
    const {next_page} = this.props.businessesMetadata.pagination;
    let prevPageArrow = null;
    prevPageArrow = (
      <MdChevronLeft
        className="pagination-arrow pagination-arrow-left"
        size={15}
        color={'#fff'}
        style={{marginRight: 15}}
        onClick={() => this.props.handleChangePage(current_page - 1)}
      />
    );

    let nextPageArrow = null;
    nextPageArrow = (
      <MdChevronRight
        className="pagination-arrow pagination-arrow-left"
        size={15}
        color={'#fff'}
        style={{marginLeft: 15}}
        onClick={() => this.props.handleChangePage(next_page)}
      />
    );
    return (
      <div className="text-center pagination between-xs middle-xs m-bot-100">
        <div>
          {prevPageArrow}
          <span className="pagination-index">{'1'}</span>
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
