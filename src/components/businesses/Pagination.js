import React from 'react';
import {PropTypes} from 'prop-types';
import MetaInfoBusinesses from './MetaInfoBusinesses';
import {MdChevronRight, MdChevronLeft} from 'react-icons/lib/md';

class Pagination extends React.Component {
  render() {
    const {currentPage} = this.props.businessesMetadata.pagination;
    const {nextPage} = this.props.businessesMetadata.pagination;
    let prevPageArrow = null;
    if (currentPage > 1) {
      prevPageArrow = (
        <MdChevronLeft
          size={20}
          color={'#0C0033'}
          style={{marginRight: 8}}
          onClick={() => this.props.handleChangePage(currentPage - 1)}
        />
      );
    }

    let nextPageArrow = null;
    if (nextPage && nextPage > 1) {
      nextPageArrow = (
        <MdChevronRight
          size={20}
          color={'#0C0033'}
          onClick={() => this.props.handleChangePage(nextPage)}
        />
      );
    }
    return (
      <div className="pagination row between-xs middle-xs">
        <MetaInfoBusinesses
          businessesMetadata={this.props.businessesMetadata}
        />
        <div>
          {prevPageArrow}
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
