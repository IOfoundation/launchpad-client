import React from 'react';
import {PropTypes} from 'prop-types';
import MetaInfoBusinesses from './MetaInfoBusinesses';
import {MdChevronRight, MdChevronLeft} from 'react-icons/lib/md';

class Pagination extends React.Component {
  render() {
    const {current_page} = this.props.businessesMetadata.pagination;
    const {next_page} = this.props.businessesMetadata.pagination;
    let prevPageArrow = null;
    if (current_page > 1) {
      prevPageArrow = (
        <MdChevronLeft
          size={20}
          color={'#0C0033'}
          style={{marginRight: 8}}
          onClick={() => this.props.handleChangePage(current_page - 1)}
        />
      );
    }

    let nextPageArrow = null;
    if (next_page && next_page > 1) {
      nextPageArrow = (
        <MdChevronRight
          size={20}
          color={'#0C0033'}
          onClick={() => this.props.handleChangePage(next_page)}
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
